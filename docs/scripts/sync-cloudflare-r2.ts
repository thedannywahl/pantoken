/**
 * Synchronize high-volume client assets (`docs/.vitepress/cf-r2-assets`) to Cloudflare R2
 * storage using the Cloudflare REST API with concurrent streaming uploads.
 *
 * Before uploading, the existing bucket contents are listed once and compared against each local
 * file's MD5 by size + hash, so unchanged files (the common case on a rerun or a retried job) are
 * skipped instead of re-uploaded. This is what makes a retried run cheap and effectively resumable.
 *
 * Progress is logged on a heartbeat (`progressIntervalMs`, `CLOUDFLARE_R2_PROGRESS_INTERVAL_MS`) so
 * a long run stays visibly alive in CI, and a short markdown summary is appended to
 * `$GITHUB_STEP_SUMMARY` when present.
 *
 * @module
 */
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { runAsMain } from "../../scripts/release/cli.ts";
import { getMimeType } from "../cloudflare/src/index.ts";

/** Default concurrent upload requests to Cloudflare R2. */
export const DEFAULT_R2_UPLOAD_CONCURRENCY = 6;

/** Number of objects requested per page when listing existing R2 objects. */
export const R2_LIST_PAGE_SIZE = 1_000;

/** Default interval between upload progress heartbeat logs, so a long run stays visibly alive. */
export const DEFAULT_R2_PROGRESS_INTERVAL_MS = 30_000;

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
  /** Interval between upload progress heartbeat logs in milliseconds (0 disables). */
  progressIntervalMs?: number;
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

/** Minimal shape of an object entry returned by the Cloudflare R2 List Objects API. */
interface R2ListedObject {
  /** Raw hex MD5 digest, as returned by the List Objects API (unquoted). */
  etag: string;
  /** Size in bytes. */
  size: number;
}

/**
 * List every object currently in the bucket, so the caller can diff local files against what's
 * already there instead of blindly re-uploading unchanged content.
 *
 * Failures here are intentionally non-fatal to the caller: on error this throws, and the caller
 * falls back to an empty map (uploading everything), which is always correct, just not optimal.
 *
 * @param fetchImpl - Fetch implementation to use.
 * @param baseUrl - Cloudflare R2 objects endpoint for the target bucket.
 * @param apiToken - Cloudflare API token.
 * @returns Map of object key to its remote size and MD5 etag.
 */
async function listExistingObjects(
  fetchImpl: typeof fetch,
  baseUrl: string,
  apiToken: string,
): Promise<Map<string, R2ListedObject>> {
  const existing = new Map<string, R2ListedObject>();
  let cursor: string | undefined;

  do {
    const url = new URL(baseUrl);
    url.searchParams.set("per_page", String(R2_LIST_PAGE_SIZE));
    if (cursor) url.searchParams.set("cursor", cursor);

    const response = await fetchImpl(url.toString(), {
      headers: { Authorization: `Bearer ${apiToken}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const body = (await response.json()) as {
      result?: Array<{ key?: string; etag?: string; size?: number }>;
      result_info?: { cursor?: string; is_truncated?: boolean };
    };

    for (const object of body.result ?? []) {
      if (object.key && object.etag && object.size !== undefined) {
        existing.set(object.key, { etag: object.etag.toLowerCase(), size: object.size });
      }
    }

    cursor = body.result_info?.is_truncated ? body.result_info.cursor : undefined;
  } while (cursor);

  return existing;
}

/** Format a millisecond duration as e.g. "1h 2m 3s" (or "3s" when under a minute). */
function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1_000));
  const hours = Math.floor(totalSeconds / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  return [hours && `${hours}h`, (hours || minutes) && `${minutes}m`, `${seconds}s`]
    .filter(Boolean)
    .join(" ");
}

/** Append a short markdown summary of the sync to `$GITHUB_STEP_SUMMARY`, if running in CI. */
function writeStepSummary(result: R2SyncResult, bucketName: string, elapsedMs: number): void {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) return;

  const lines = [
    "### Cloudflare R2 sync",
    "",
    "| Total | Uploaded | Unchanged | Errors | Uploaded size | Duration |",
    "| --- | --- | --- | --- | --- | --- |",
    `| ${result.totalFiles} | ${result.uploadedFiles} | ${result.skippedFiles} | ${result.errors.length} | ` +
      `${(result.uploadedBytes / 1024 / 1024).toFixed(1)} MB | ${formatDuration(elapsedMs)} |`,
    "",
    `Bucket: \`${bucketName}\``,
    "",
  ];

  try {
    appendFileSync(summaryPath, `${lines.join("\n")}\n`);
  } catch {
    // Best-effort only; never fail the sync because the job summary couldn't be written.
  }
}

/**
 * Shuffle files in place (Fisher-Yates) so upload order doesn't follow directory order.
 *
 * `walkFiles` always visits directories in the same order (e.g. `assets/` fully before
 * `demos-assets/`), so a run that's cancelled or times out partway leaves whichever directory
 * comes later completely untouched. Randomizing order means a partial run makes proportional
 * progress across every prefix instead of finishing one directory and starving the rest.
 */
function shuffleInPlace<T>(items: T[]): void {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
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
  const startedAt = Date.now();
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
  const progressIntervalMs = nonNegativeInteger(
    options.progressIntervalMs,
    nonNegativeIntegerFromEnv(
      "CLOUDFLARE_R2_PROGRESS_INTERVAL_MS",
      DEFAULT_R2_PROGRESS_INTERVAL_MS,
    ),
  );
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
  // Randomize order so a cancelled/timed-out run makes proportional progress across every
  // directory (e.g. `demos-assets/`) instead of only ever reaching whatever comes first.
  shuffleInPlace(allFiles);
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

  console.log(
    `ℹ Cloudflare R2 sync: found ${result.totalFiles} files ` +
      `(${(result.totalBytes / 1024 / 1024).toFixed(1)} MB) under ${r2AssetsDir}.`,
  );

  const baseUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects`;

  // A fresh bucket, a bucket the API token can't list, or a transient list failure all just mean an
  // empty map here, which degrades to uploading every file below - never to under-uploading.
  let existingObjects = new Map<string, R2ListedObject>();
  const listStartedAt = Date.now();
  try {
    existingObjects = await listExistingObjects(fetchImpl, baseUrl, apiToken);
    console.log(
      `ℹ Listed ${existingObjects.size} existing R2 object(s) in ${formatDuration(Date.now() - listStartedAt)}.`,
    );
  } catch (err) {
    console.error(
      `⚠ Could not list existing R2 objects, uploading all files: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  const uploadFile = async (filePath: string): Promise<void> => {
    assertAssetPathUnderRoot(r2AssetsDir, filePath);

    const relKey = relative(r2AssetsDir, filePath).replace(/\\/gu, "/");
    // Uploads only bytes from files discovered under r2AssetsDir; assertAssetPathUnderRoot above
    // rejects any path escape. See .github/codeql/codeql-config.yml for why this file is excluded
    // from the js/file-data-in-request CodeQL query instead of relying on inline suppression.
    const fileBytes = readFileSync(filePath);
    const contentType = getMimeType(relKey);

    const existingObject = existingObjects.get(relKey);
    if (existingObject && existingObject.size === fileBytes.length) {
      const localEtag = createHash("md5").update(fileBytes).digest("hex");
      if (localEtag === existingObject.etag) {
        result.skippedFiles += 1;
        return;
      }
    }

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

  const heartbeat =
    progressIntervalMs > 0
      ? setInterval(() => {
          const processed = result.uploadedFiles + result.skippedFiles + result.errors.length;
          console.log(
            `… Cloudflare R2 sync progress: ${processed}/${result.totalFiles} files processed ` +
              `(${result.uploadedFiles} uploaded, ${result.skippedFiles} unchanged, ${result.errors.length} errors) ` +
              `- ${formatDuration(Date.now() - startedAt)} elapsed.`,
          );
        }, progressIntervalMs)
      : undefined;
  heartbeat?.unref();

  try {
    await runWithConcurrency(allFiles, concurrency, uploadFile);
  } finally {
    if (heartbeat) clearInterval(heartbeat);
  }

  const elapsedMs = Date.now() - startedAt;
  writeStepSummary(result, bucketName, elapsedMs);

  if (result.errors.length > 0) {
    console.error(
      `✗ Cloudflare R2 sync encountered ${result.errors.length} error(s) out of ${result.totalFiles} files ` +
        `after ${formatDuration(elapsedMs)}.`,
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
      `(${(result.uploadedBytes / 1024 / 1024).toFixed(1)} MB), ${result.skippedFiles} unchanged, ` +
      `in ${formatDuration(elapsedMs)} to bucket "${bucketName}".`,
  );

  return result;
}

async function main(): Promise<void> {
  await syncR2Assets();
}

runAsMain(import.meta.url, main);
