/**
 * Prepare docs production deployment for Cloudflare: splits `docs/.vitepress/dist`
 * into a Cloudflare Workers Static Assets tree (`cf-worker-dist`) and an R2 bucket
 * assets tree (`cf-r2-assets`).
 *
 * Workers Static Assets hosts HTML, metadata, icons, and shadcn registry files (~43k files),
 * while R2 hosts high-file-count client bundles (`assets/`) and demo assets (`demos-assets/`) (~95k files).
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

/** Maximum files permitted in a single Cloudflare Worker Static Assets version on Workers Paid. */
export const MAX_WORKER_STATIC_FILES = 100_000;

/** Maximum single file size permitted in Cloudflare Worker Static Assets (25 MiB). */
export const MAX_WORKER_STATIC_FILE_SIZE_BYTES = 25 * 1024 * 1024;

/** URL path prefixes routed to R2 rather than Worker Static Assets. */
export const R2_PATH_PREFIXES = ["assets", "demos-assets"] as const;

/** File statistics for an asset in the deployment tree. */
export interface DeployFileStat {
  /** Relative path within the target tree. */
  path: string;
  /** File size in bytes. */
  bytes: number;
}

/** Summary stats for a deployment target tree (Worker or R2). */
export interface DeployTreeSummary {
  /** Total count of files in the tree. */
  count: number;
  /** Total size in bytes of all files in the tree. */
  bytes: number;
  /** Largest single file in the tree. */
  largestFile?: DeployFileStat;
}

/** Complete deployment preparation manifest. */
export interface CloudflareDeployManifest {
  /** Summary of files in the Worker Static Assets tree. */
  worker: DeployTreeSummary;
  /** Summary of files in the R2 assets tree. */
  r2: DeployTreeSummary;
  /** Timestamp when the deployment was prepared. */
  generatedAt: string;
}

/** Options for preparing the Cloudflare deployment trees. */
export interface PrepareDeployOptions {
  /** Source dist directory (default: `docs/.vitepress/dist`). */
  distDir?: string;
  /** Target directory for Worker Static Assets (default: `docs/.vitepress/cf-worker-dist`). */
  workerDistDir?: string;
  /** Target directory for R2 assets (default: `docs/.vitepress/cf-r2-assets`). */
  r2AssetsDir?: string;
  /** Path to write the deploy manifest (default: `docs/.vitepress/cloudflare-deploy-manifest.json`). */
  manifestPath?: string;
  /** Maximum allowed worker file count before failing. */
  maxWorkerFiles?: number;
  /** Maximum allowed worker file size in bytes before failing. */
  maxWorkerFileSizeBytes?: number;
}

/**
 * Determine whether a relative file path belongs to R2 assets or Worker static assets.
 *
 * @param relPath - Path relative to dist root.
 * @returns True if the path starts with an R2 asset prefix.
 */
export function isR2AssetPath(relPath: string): boolean {
  const normalized = relPath.replace(/\\/gu, "/").replace(/^\/+/u, "");
  return R2_PATH_PREFIXES.some(
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
 * Split `distDir` into Worker Static Assets and R2 assets, enforcing size and count limits.
 *
 * @param options - Configuration options.
 * @returns The generated deployment manifest.
 */
export async function prepareCloudflareDeploy(
  options: PrepareDeployOptions = {},
): Promise<CloudflareDeployManifest> {
  const docsRoot = resolve(import.meta.dirname, "..");
  const distDir = resolve(
    options.distDir ?? process.env.DOCS_DIST_DIR ?? join(docsRoot, ".vitepress", "dist"),
  );
  const workerDistDir = resolve(
    options.workerDistDir ??
      process.env.DOCS_CF_WORKER_DIST_DIR ??
      join(docsRoot, ".vitepress", "cf-worker-dist"),
  );
  const r2AssetsDir = resolve(
    options.r2AssetsDir ??
      process.env.DOCS_CF_R2_ASSETS_DIR ??
      join(docsRoot, ".vitepress", "cf-r2-assets"),
  );
  const manifestPath = resolve(
    options.manifestPath ??
      process.env.DOCS_CF_MANIFEST_PATH ??
      join(docsRoot, ".vitepress", "cloudflare-deploy-manifest.json"),
  );
  const maxWorkerFiles = options.maxWorkerFiles ?? MAX_WORKER_STATIC_FILES;
  const maxWorkerFileSizeBytes =
    options.maxWorkerFileSizeBytes ?? MAX_WORKER_STATIC_FILE_SIZE_BYTES;

  if (!existsSync(distDir)) {
    throw new Error(`Source dist directory does not exist: ${distDir}`);
  }

  // Clean target directories
  rmSync(workerDistDir, { recursive: true, force: true });
  rmSync(r2AssetsDir, { recursive: true, force: true });
  mkdirSync(workerDistDir, { recursive: true });
  mkdirSync(r2AssetsDir, { recursive: true });

  const allFiles = walkFiles(distDir);
  const workerSummary: DeployTreeSummary = { count: 0, bytes: 0 };
  const r2Summary: DeployTreeSummary = { count: 0, bytes: 0 };

  for (const file of allFiles) {
    const rel = relative(distDir, file);
    const size = statSync(file).size;
    const isR2 = isR2AssetPath(rel);

    if (isR2) {
      const dest = join(r2AssetsDir, rel);
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(file, dest);

      r2Summary.count += 1;
      r2Summary.bytes += size;
      if (!r2Summary.largestFile || size > r2Summary.largestFile.bytes) {
        r2Summary.largestFile = { path: rel, bytes: size };
      }
    } else {
      if (size > maxWorkerFileSizeBytes) {
        throw new Error(
          `File "${rel}" (${(size / 1024 / 1024).toFixed(2)} MiB) exceeds Cloudflare Workers Static Assets limit ` +
            `of ${(maxWorkerFileSizeBytes / 1024 / 1024).toFixed(2)} MiB.`,
        );
      }

      const dest = join(workerDistDir, rel);
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(file, dest);

      workerSummary.count += 1;
      workerSummary.bytes += size;
      if (!workerSummary.largestFile || size > workerSummary.largestFile.bytes) {
        workerSummary.largestFile = { path: rel, bytes: size };
      }
    }
  }

  if (workerSummary.count > maxWorkerFiles) {
    throw new Error(
      `Worker Static Assets tree contains ${workerSummary.count} files, exceeding limit of ${maxWorkerFiles}.`,
    );
  }

  const manifest: CloudflareDeployManifest = {
    worker: workerSummary,
    r2: r2Summary,
    generatedAt: new Date().toISOString(),
  };

  mkdirSync(dirname(manifestPath), { recursive: true });
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `✓ Cloudflare deploy prepared: ` +
      `Worker Static Assets: ${workerSummary.count} files (${(workerSummary.bytes / 1024 / 1024).toFixed(1)} MB), ` +
      `R2 Assets: ${r2Summary.count} files (${(r2Summary.bytes / 1024 / 1024).toFixed(1)} MB)`,
  );

  return manifest;
}

async function main(): Promise<void> {
  await prepareCloudflareDeploy();
}

runAsMain(import.meta.url, main);
