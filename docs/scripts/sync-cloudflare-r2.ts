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
export const DEFAULT_R2_UPLOAD_CONCURRENCY = 6;

/** Default number of retry attempts for transient Cloudflare responses. */
export const DEFAULT_R2_UPLOAD_MAX_RETRIES = 6;

/** Default initial retry delay for transient Cloudflare responses. */
export const DEFAULT_R2_UPLOAD_RETRY_BASE_DELAY_MS = 1_000;

/** Default maximum retry delay for transient Cloudflare responses. */
export const DEFAULT_R2_UPLOAD_RETRY_MAX_DELAY_MS = 30_000;

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
  /** Maximum retry attempts for transient Cloudflare responses. */
  maxRetries?: number;
  /** Initial retry delay in milliseconds. */
  retryBaseDelayMs?: number;
  /** Maximum retry delay in milliseconds. */
  retryMaxDelayMs?: number;
  /** Dry run mode (scans and validates without performing HTTP writes). */
  dryRun?: boolean;
  /** Custom fetch implementation for testing and mocking. */
  fetchFn?: typeof fetch;
  /** Custom sleep implementation for testing retry behavior. */
  sleepFn?: (ms: number) => Promise<void>;
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

function positiveInteger(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) && value !== undefined ? Math.max(1, Math.trunc(value)) : fallback;
}

function positiveIntegerFromEnv(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return positiveInteger(value, fallback);
}

function nonNegativeInteger(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) && value !== undefined ? Math.max(0, Math.trunc(value)) : fallback;
}

function nonNegativeIntegerFromEnv(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return nonNegativeInteger(value, fallback);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

function isRetryableStatus(status: number): boolean {
  return status === 429 || (status >= 500 && status < 600);
}

function retryAfterDelayMs(response: Response | undefined): number | undefined {
  const retryAfter = response?.headers.get("Retry-After")?.trim();
  if (!retryAfter) return undefined;

  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1_000;
  }

  const retryAt = Date.parse(retryAfter);
  if (Number.isFinite(retryAt)) {
    return Math.max(0, retryAt - Date.now());
  }

  return undefined;
}

function retryDelayMs(
  attempt: number,
  response: Response | undefined,
  baseDelayMs: number,
  maxDelayMs: number,
): number {
  return Math.min(retryAfterDelayMs(response) ?? baseDelayMs * 2 ** attempt, maxDelayMs);
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
      const item = queue.shift() as T;
      await fn(item);
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
  const concurrency = positiveInteger(
    options.concurrency,
    positiveIntegerFromEnv("CLOUDFLARE_R2_UPLOAD_CONCURRENCY", DEFAULT_R2_UPLOAD_CONCURRENCY),
  );
  const maxRetries = positiveInteger(
    options.maxRetries,
    positiveIntegerFromEnv("CLOUDFLARE_R2_MAX_RETRIES", DEFAULT_R2_UPLOAD_MAX_RETRIES),
  );
  const retryBaseDelay = nonNegativeInteger(
    options.retryBaseDelayMs,
    nonNegativeIntegerFromEnv(
      "CLOUDFLARE_R2_RETRY_BASE_DELAY_MS",
      DEFAULT_R2_UPLOAD_RETRY_BASE_DELAY_MS,
    ),
  );
  const retryMaxDelay = nonNegativeInteger(
    options.retryMaxDelayMs,
    nonNegativeIntegerFromEnv(
      "CLOUDFLARE_R2_RETRY_MAX_DELAY_MS",
      DEFAULT_R2_UPLOAD_RETRY_MAX_DELAY_MS,
    ),
  );
  const dryRun =
    options.dryRun ?? (process.env.CLOUDFLARE_R2_DRY_RUN === "true" || (!accountId && !apiToken));
  const fetchImpl = options.fetchFn ?? globalThis.fetch;
  const sleepImpl = options.sleepFn ?? sleep;

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
    // Uploads only bytes from files discovered under r2AssetsDir; assertAssetPathUnderRoot above
    // rejects any path escape. See .github/codeql/codeql-config.yml for why this file is excluded
    // from the js/file-data-in-request CodeQL query instead of relying on inline suppression.
    const fileBytes = readFileSync(filePath);
    const contentType = getMimeType(relKey);

    const targetUrl = `${baseUrl}/${encodeURIComponent(relKey).replace(/%2F/gu, "/")}`;

    try {
      for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
        let response: Response;
        try {
          response = await fetchImpl(targetUrl, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${apiToken}`,
              "Content-Type": contentType,
              "Content-Length": String(fileBytes.length),
            },
            body: fileBytes,
          });
        } catch (err) {
          if (attempt < maxRetries) {
            await sleepImpl(retryDelayMs(attempt, undefined, retryBaseDelay, retryMaxDelay));
            continue;
          }
          throw err;
        }

        if (response.ok) {
          result.uploadedFiles += 1;
          result.uploadedBytes += fileBytes.length;
          return;
        }

        if (attempt < maxRetries && isRetryableStatus(response.status)) {
          await sleepImpl(retryDelayMs(attempt, response, retryBaseDelay, retryMaxDelay));
          continue;
        }

        const errorBody = await response.text().catch(() => "");
        throw new Error(`HTTP ${response.status} ${response.statusText}: ${errorBody}`);
      }
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
