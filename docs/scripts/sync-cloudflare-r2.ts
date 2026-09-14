/**
 * Synchronize high-volume client assets (`docs/.vitepress/cf-r2-assets`) to Cloudflare R2
 * storage using the Cloudflare REST API with concurrent streaming uploads.
 *
 * @module
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { runAsMain } from "../../scripts/release/cli.ts";
import { getMimeType } from "../cloudflare/src/index.ts";

/** Default concurrent upload requests to Cloudflare R2. */
export const DEFAULT_R2_UPLOAD_CONCURRENCY = 25;

/** Options for synchronizing assets to Cloudflare R2. */
export interface R2SyncOptions {
  /** Directory containing assets to upload (default: `docs/.vitepress/cf-r2-assets`). */
  r2AssetsDir?: string;
  /** Cloudflare Account ID (default: `process.env.CLOUDFLARE_ACCOUNT_ID`). */
  accountId?: string;
  /** Cloudflare API Token with R2 edit permissions (default: `process.env.CLOUDFLARE_API_TOKEN`). */
  apiToken?: string;
  /** Target R2 bucket name (default: `process.env.CLOUDFLARE_R2_BUCKET` or `pantoken-docs-assets`). */
  bucketName?: string;
  /** Maximum number of concurrent uploads. */
  concurrency?: number;
  /** Dry run mode (scans and validates without performing HTTP writes). */
  dryRun?: boolean;
  /** Custom fetch implementation for testing and mocking. */
  fetchFn?: typeof fetch;
}

/** Result summary of an R2 synchronization run. */
export interface R2SyncResult {
  /** Total files discovered in the asset tree. */
  totalFiles: number;
  /** Number of files successfully uploaded. */
  uploadedFiles: number;
  /** Number of files skipped (e.g. in dry-run or when matching). */
  skippedFiles: number;
  /** Total byte size of all discovered files. */
  totalBytes: number;
  /** Total byte size of all uploaded files. */
  uploadedBytes: number;
  /** Any upload errors encountered during the run. */
  errors: Array<{ file: string; error: string }>;
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
 * Ensure a candidate upload path stays within the generated asset directory tree.
 *
 * This script intentionally uploads only the files produced by the docs build and the Cloudflare
 * asset-prep step; a path escape here would risk uploading unrelated files from the local checkout.
 */
export function assertAssetPathUnderRoot(rootDir: string, filePath: string): void {
  const resolvedRoot = resolve(rootDir);
  const resolvedFile = resolve(filePath);
  const rel = relative(resolvedRoot, resolvedFile);
  const isWithinRoot = rel === "" || (!rel.startsWith("..") && !pathIsAbsolute(rel));

  if (isWithinRoot) {
    return;
  }

  throw new Error(
    `Refusing to upload "${filePath}" because it is outside the asset directory "${rootDir}".`,
  );
}

function pathIsAbsolute(pathLike: string): boolean {
  return pathLike.startsWith("/") || pathLike.startsWith("\\") || /^[A-Za-z]:[\\/]/u.test(pathLike);
}

/**
 * Execute an array of async tasks with bounded concurrency.
 *
 * @param items - Items to process.
 * @param concurrency - Maximum simultaneous operations.
 * @param fn - Processing function.
 */
async function runWithConcurrency<T>(
  items: readonly T[],
  concurrency: number,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  const queue = [...items];
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      if (item !== undefined) {
        await fn(item);
      }
    }
  });
  await Promise.all(workers);
}

/**
 * Synchronize local R2 assets to Cloudflare R2 bucket.
 *
 * @param options - Sync options.
 * @returns Summary of synchronization operations.
 */
export async function syncR2Assets(options: R2SyncOptions = {}): Promise<R2SyncResult> {
  const docsRoot = resolve(import.meta.dirname, "..");
  const r2AssetsDir = resolve(
    options.r2AssetsDir ??
      process.env.DOCS_CF_R2_ASSETS_DIR ??
      join(docsRoot, ".vitepress", "cf-r2-assets"),
  );
  const accountId = (options.accountId ?? process.env.CLOUDFLARE_ACCOUNT_ID ?? "").trim();
  const apiToken = (options.apiToken ?? process.env.CLOUDFLARE_API_TOKEN ?? "").trim();
  const bucketName = (
    options.bucketName ??
    process.env.CLOUDFLARE_R2_BUCKET ??
    "pantoken-docs-assets"
  ).trim();
  const concurrency = Math.max(1, options.concurrency ?? DEFAULT_R2_UPLOAD_CONCURRENCY);
  const dryRun =
    options.dryRun ?? (process.env.CLOUDFLARE_R2_DRY_RUN === "true" || (!accountId && !apiToken));
  const fetchImpl = options.fetchFn ?? globalThis.fetch;

  if (!existsSync(r2AssetsDir)) {
    throw new Error(`R2 assets directory does not exist: ${r2AssetsDir}`);
  }

  if (!dryRun && (!accountId || !apiToken)) {
    throw new Error(
      "Missing Cloudflare credentials. Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN, or enable dry-run.",
    );
  }

  const allFiles = walkFiles(r2AssetsDir);
  const result: R2SyncResult = {
    totalFiles: allFiles.length,
    uploadedFiles: 0,
    skippedFiles: 0,
    totalBytes: 0,
    uploadedBytes: 0,
    errors: [],
  };

  for (const file of allFiles) {
    result.totalBytes += statSync(file).size;
  }

  if (dryRun) {
    result.skippedFiles = allFiles.length;
    console.log(
      `ℹ Cloudflare R2 sync (dry run): found ${result.totalFiles} files (${(result.totalBytes / 1024 / 1024).toFixed(1)} MB) to upload to ${bucketName}.`,
    );
    return result;
  }

  const baseUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects`;

  const uploadFile = async (filePath: string): Promise<void> => {
    assertAssetPathUnderRoot(r2AssetsDir, filePath);

    const relKey = relative(r2AssetsDir, filePath).replace(/\\/gu, "/");
    // This upload intentionally sends the bytes of a known, generated asset to the configured Cloudflare bucket.
    // The asset list is derived from the docs build output and is validated to stay under the R2 asset root.
    // lgtm[js/file-data-in-request]
    const fileBytes = readFileSync(filePath);
    const contentType = getMimeType(relKey);

    const targetUrl = `${baseUrl}/${encodeURIComponent(relKey).replace(/%2F/gu, "/")}`;

    try {
      const response = await fetchImpl(targetUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": contentType,
          "Content-Length": String(fileBytes.length),
        },
        body: fileBytes,
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        throw new Error(`HTTP ${response.status} ${response.statusText}: ${errorBody}`);
      }

      result.uploadedFiles += 1;
      result.uploadedBytes += fileBytes.length;
    } catch (err) {
      result.errors.push({
        file: relKey,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };

  await runWithConcurrency(allFiles, concurrency, uploadFile);

  if (result.errors.length > 0) {
    console.error(
      `✗ Cloudflare R2 sync encountered ${result.errors.length} error(s) out of ${result.totalFiles} files.`,
    );
    throw new Error(
      `R2 upload failed for ${result.errors.length} file(s):\n` +
        result.errors
          .map((e) => `  - ${e.file}: ${e.error}`)
          .slice(0, 10)
          .join("\n"),
    );
  }

  console.log(
    `✓ Cloudflare R2 sync complete: uploaded ${result.uploadedFiles}/${result.totalFiles} files ` +
      `(${(result.uploadedBytes / 1024 / 1024).toFixed(1)} MB) to bucket "${bucketName}".`,
  );

  return result;
}

async function main(): Promise<void> {
  await syncR2Assets();
}

runAsMain(import.meta.url, main);
