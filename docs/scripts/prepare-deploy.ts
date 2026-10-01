/**
 * Prepare the docs production deployment: splits `docs/.vitepress/dist` into a static site
 * tree (`deploy-site`) and an object-storage asset tree (`deploy-assets`).
 *
 * The static site tree holds HTML, metadata, icons, and shadcn registry files (~43k files),
 * while the asset bucket holds high-file-count client bundles (`assets/`) and demo assets
 * (`demos-assets/`) (~95k files).
 *
 * @module
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { runAsMain } from "../../scripts/release/cli.ts";

/** Maximum files the static host accepts in a single site version. */
export const MAX_SITE_FILES = 100_000;

/** Maximum single file size the static host accepts (25 MiB). */
export const MAX_SITE_FILE_SIZE_BYTES = 25 * 1024 * 1024;

/** URL path prefixes routed to the asset bucket rather than the static site tree. */
export const BUCKET_PATH_PREFIXES = ["assets", "demos-assets"] as const;

/** File statistics for an asset in the deployment tree. */
export interface DeployFileStat {
  /** Relative path within the target tree. */
  path: string;
  /** File size in bytes. */
  bytes: number;
}

/** Summary stats for a deployment target tree (site or assets). */
export interface DeployTreeSummary {
  /** Total count of files in the tree. */
  count: number;
  /** Total size in bytes of all files in the tree. */
  bytes: number;
  /** Largest single file in the tree. */
  largestFile?: DeployFileStat;
}

/** Complete deployment preparation manifest. */
export interface DeployManifest {
  /** Summary of files in the static site tree. */
  site: DeployTreeSummary;
  /** Summary of files in the asset bucket tree. */
  assets: DeployTreeSummary;
  /** Timestamp when the deployment was prepared. */
  generatedAt: string;
}

/** Options for preparing the deployment trees. */
export interface PrepareDeployOptions {
  /** Source dist directory (default: `docs/.vitepress/dist`). */
  distDir?: string;
  /** Target directory for the static site tree (default: `docs/.vitepress/deploy-site`). */
  siteDir?: string;
  /** Target directory for bucket assets (default: `docs/.vitepress/deploy-assets`). */
  assetsDir?: string;
  /** Path to write the deploy manifest (default: `docs/.vitepress/deploy-manifest.json`). */
  manifestPath?: string;
  /** Maximum allowed site file count before failing. */
  maxSiteFiles?: number;
  /** Maximum allowed site file size in bytes before failing. */
  maxSiteFileSizeBytes?: number;
}

/**
 * Determine whether a relative file path belongs to the asset bucket or the static site tree.
 *
 * @param relPath - Path relative to dist root.
 * @returns True if the path starts with a bucket asset prefix.
 */
export function isBucketAssetPath(relPath: string): boolean {
  const normalized = relPath.replace(/\\/gu, "/").replace(/^\/+/u, "");
  return BUCKET_PATH_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
}

/**
 * Recursively collect all file paths under a directory.
 *
 * @param dir - Root directory to walk.
 * @returns Array of absolute file paths.
 */
function walkFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const files: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Split `distDir` into the static site tree and bucket assets, enforcing size and count limits.
 *
 * @param options - Configuration options.
 * @returns The generated deployment manifest.
 */
export async function prepareDeploy(options: PrepareDeployOptions = {}): Promise<DeployManifest> {
  const docsRoot = resolve(import.meta.dirname, "..");
  const distDir = resolve(
    options.distDir ?? process.env.DOCS_DIST_DIR ?? join(docsRoot, ".vitepress", "dist"),
  );
  const siteDir = resolve(
    options.siteDir ??
      process.env.DOCS_DEPLOY_SITE_DIR ??
      join(docsRoot, ".vitepress", "deploy-site"),
  );
  const assetsDir = resolve(
    options.assetsDir ??
      process.env.DOCS_DEPLOY_ASSETS_DIR ??
      join(docsRoot, ".vitepress", "deploy-assets"),
  );
  const manifestPath = resolve(
    options.manifestPath ??
      process.env.DOCS_DEPLOY_MANIFEST_PATH ??
      join(docsRoot, ".vitepress", "deploy-manifest.json"),
  );
  const maxSiteFiles = options.maxSiteFiles ?? MAX_SITE_FILES;
  const maxSiteFileSizeBytes = options.maxSiteFileSizeBytes ?? MAX_SITE_FILE_SIZE_BYTES;

  if (!existsSync(distDir)) {
    throw new Error(`Source dist directory does not exist: ${distDir}`);
  }

  // Clean target directories
  rmSync(siteDir, { recursive: true, force: true });
  rmSync(assetsDir, { recursive: true, force: true });
  mkdirSync(siteDir, { recursive: true });
  mkdirSync(assetsDir, { recursive: true });

  const allFiles = walkFiles(distDir);
  const siteSummary: DeployTreeSummary = { count: 0, bytes: 0 };
  const assetsSummary: DeployTreeSummary = { count: 0, bytes: 0 };

  for (const file of allFiles) {
    const rel = relative(distDir, file);
    const size = statSync(file).size;

    if (isBucketAssetPath(rel)) {
      const dest = join(assetsDir, rel);
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(file, dest);

      assetsSummary.count += 1;
      assetsSummary.bytes += size;
      if (!assetsSummary.largestFile || size > assetsSummary.largestFile.bytes) {
        assetsSummary.largestFile = { path: rel, bytes: size };
      }
    } else {
      if (size > maxSiteFileSizeBytes) {
        throw new Error(
          `File "${rel}" (${(size / 1024 / 1024).toFixed(2)} MiB) exceeds the static site per-file limit ` +
            `of ${(maxSiteFileSizeBytes / 1024 / 1024).toFixed(2)} MiB.`,
        );
      }

      const dest = join(siteDir, rel);
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(file, dest);

      siteSummary.count += 1;
      siteSummary.bytes += size;
      if (!siteSummary.largestFile || size > siteSummary.largestFile.bytes) {
        siteSummary.largestFile = { path: rel, bytes: size };
      }
    }
  }

  if (siteSummary.count > maxSiteFiles) {
    throw new Error(
      `Static site tree contains ${siteSummary.count} files, exceeding limit of ${maxSiteFiles}.`,
    );
  }

  const manifest: DeployManifest = {
    site: siteSummary,
    assets: assetsSummary,
    generatedAt: new Date().toISOString(),
  };

  mkdirSync(dirname(manifestPath), { recursive: true });
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `✓ Deploy prepared: ` +
      `Static site: ${siteSummary.count} files (${(siteSummary.bytes / 1024 / 1024).toFixed(1)} MB), ` +
      `Bucket assets: ${assetsSummary.count} files (${(assetsSummary.bytes / 1024 / 1024).toFixed(1)} MB)`,
  );

  return manifest;
}

async function main(): Promise<void> {
  await prepareDeploy();
}

runAsMain(import.meta.url, main);
