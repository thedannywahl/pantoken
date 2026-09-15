import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import {
  assertAssetPathUnderRoot,
  DEFAULT_R2_UPLOAD_CONCURRENCY,
  syncR2Assets,
} from "./sync-cloudflare-r2.ts";

const MODULE_PATH = new URL("./sync-cloudflare-r2.ts", import.meta.url).pathname;

/** Empty List Objects response, so tests that don't exercise diffing can ignore the list call. */
const emptyListResponse = (): Response =>
  new Response(JSON.stringify({ result: [], result_info: { is_truncated: false } }), {
    status: 200,
  });

const md5Hex = (content: string): string => createHash("md5").update(content).digest("hex");

let tempDir: string;
let r2AssetsDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), "cf-r2-sync-test-"));
  r2AssetsDir = join(tempDir, "cf-r2-assets");
  mkdirSync(r2AssetsDir, { recursive: true });
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("syncR2Assets performs dry-run when credentials are not supplied", async () => {
  const file1 = join(r2AssetsDir, "assets/chunks/app.js");
  const file2 = join(r2AssetsDir, "demos-assets/style.css");
  mkdirSync(dirname(file1), { recursive: true });
  mkdirSync(dirname(file2), { recursive: true });
  writeFileSync(file1, "console.log(1);");
  writeFileSync(file2, "body { color: red; }");

  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncR2Assets({
    r2AssetsDir,
    dryRun: true,
  });

  expect(result.totalFiles).toBe(2);
  expect(result.uploadedFiles).toBe(0);
  expect(result.skippedFiles).toBe(2);
  expect(result.totalBytes).toBeGreaterThan(0);
  expect(result.errors).toHaveLength(0);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("dry run"));
});

test("syncR2Assets throws when directory does not exist", async () => {
  await expect(
    syncR2Assets({
      r2AssetsDir: join(tempDir, "nonexistent"),
    }),
  ).rejects.toThrow(/R2 assets directory does not exist/);
});

test("syncR2Assets throws when credentials are missing in non-dry-run mode", async () => {
  await expect(
    syncR2Assets({
      r2AssetsDir,
      dryRun: false,
      accountId: "",
      apiToken: "",
    }),
  ).rejects.toThrow(/Missing Cloudflare credentials/);
});

test("assertAssetPathUnderRoot rejects paths outside the configured asset directory", () => {
  expect(() =>
    assertAssetPathUnderRoot(r2AssetsDir, join(r2AssetsDir, "..", "outside.txt")),
  ).toThrow(/outside the asset directory/i);

  expect(() =>
    assertAssetPathUnderRoot(r2AssetsDir, join(r2AssetsDir, "assets", "app.js")),
  ).not.toThrow();
});

test("syncR2Assets uploads files with authorization and content type headers", async () => {
  const file1 = join(r2AssetsDir, "assets/chunks/app.123.js");
  const file2 = join(r2AssetsDir, "demos-assets/style.css");
  mkdirSync(dirname(file1), { recursive: true });
  mkdirSync(dirname(file2), { recursive: true });
  writeFileSync(file1, "console.log('app');");
  writeFileSync(file2, "body { margin: 0; }");

  const uploadedUrls: string[] = [];
  const mockFetch = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
    uploadedUrls.push(url);
    expect(init?.method).toBe("PUT");
    expect((init?.headers as Record<string, string>)?.Authorization).toBe("Bearer test-token");
    return Promise.resolve(new Response(null, { status: 200 }));
  });

  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncR2Assets({
    r2AssetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    bucketName: "test-bucket",
    dryRun: false,
    concurrency: 2,
    fetchFn: mockFetch as unknown as typeof fetch,
  });

  expect(result.totalFiles).toBe(2);
  expect(result.uploadedFiles).toBe(2);
  expect(result.errors).toHaveLength(0);
  expect(mockFetch).toHaveBeenCalledTimes(2);
  expect(uploadedUrls).toContain(
    "https://api.cloudflare.com/client/v4/accounts/test-account/r2/buckets/test-bucket/objects/assets/chunks/app.123.js",
  );
  expect(uploadedUrls).toContain(
    "https://api.cloudflare.com/client/v4/accounts/test-account/r2/buckets/test-bucket/objects/demos-assets/style.css",
  );
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Cloudflare R2 sync complete"));
});

test("syncR2Assets retries rate-limited uploads before reporting success", async () => {
  const file = join(r2AssetsDir, "assets/chunks/rate-limited.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('retry');");

  const mockFetch = vi
    .fn()
    .mockResolvedValueOnce(
      new Response("Too Many Requests", { status: 429, headers: { "Retry-After": "0" } }),
    )
    .mockResolvedValueOnce(new Response(null, { status: 200 }));
  const sleepSpy = vi.fn().mockResolvedValue(undefined);
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncR2Assets({
    r2AssetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    concurrency: 1,
    maxRetries: 1,
    fetchFn: mockFetch as unknown as typeof fetch,
    sleepFn: sleepSpy,
  });

  expect(result.uploadedFiles).toBe(1);
  expect(result.errors).toHaveLength(0);
  expect(mockFetch).toHaveBeenCalledTimes(2);
  expect(sleepSpy).toHaveBeenCalledWith(0);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Cloudflare R2 sync complete"));
});

test("syncR2Assets does not retry non-retryable upload errors", async () => {
  const file = join(r2AssetsDir, "assets/chunks/unauthorized.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "no retry");

  const mockFetch = vi
    .fn()
    .mockResolvedValue(new Response("Unauthorized", { status: 401, statusText: "Unauthorized" }));
  const sleepSpy = vi.fn().mockResolvedValue(undefined);
  const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  await expect(
    syncR2Assets({
      r2AssetsDir,
      accountId: "test-account",
      apiToken: "bad-token",
      dryRun: false,
      maxRetries: 3,
      retryBaseDelayMs: 0,
      fetchFn: mockFetch as unknown as typeof fetch,
      sleepFn: sleepSpy,
    }),
  ).rejects.toThrow(/R2 upload failed/);

  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(sleepSpy).not.toHaveBeenCalled();
  expect(errSpy).toHaveBeenCalled();
});

test("syncR2Assets handles and throws on upload errors", async () => {
  const file = join(r2AssetsDir, "assets/chunks/error.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "error");

  const mockFetch = vi
    .fn()
    .mockResolvedValue(new Response("Unauthorized", { status: 401, statusText: "Unauthorized" }));
  const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  await expect(
    syncR2Assets({
      r2AssetsDir,
      accountId: "test-account",
      apiToken: "bad-token",
      dryRun: false,
      fetchFn: mockFetch as unknown as typeof fetch,
    }),
  ).rejects.toThrow(/R2 upload failed/);

  expect(errSpy).toHaveBeenCalled();
});

test("walkFiles skips entries that are neither files nor directories", async () => {
  const file = join(r2AssetsDir, "assets/kept.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('kept');");
  symlinkSync(join(tempDir, "missing-target"), join(r2AssetsDir, "broken-link"));

  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncR2Assets({ r2AssetsDir, dryRun: true });

  expect(result.totalFiles).toBe(1);
  expect(logSpy).toHaveBeenCalled();
});

test("syncR2Assets retries on network errors using the default sleep implementation", async () => {
  const file = join(r2AssetsDir, "assets/chunks/flaky.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('flaky');");

  const mockFetch = vi
    .fn()
    .mockRejectedValueOnce(new TypeError("network down"))
    .mockResolvedValueOnce(new Response(null, { status: 200 }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncR2Assets({
    r2AssetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    maxRetries: 1,
    retryBaseDelayMs: 0,
    fetchFn: mockFetch as unknown as typeof fetch,
  });

  expect(result.uploadedFiles).toBe(1);
  expect(result.errors).toHaveLength(0);
  expect(mockFetch).toHaveBeenCalledTimes(2);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Cloudflare R2 sync complete"));
});

test("syncR2Assets records an error after exhausting retries on network errors", async () => {
  const file = join(r2AssetsDir, "assets/chunks/down.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('down');");

  const mockFetch = vi.fn().mockRejectedValue(new TypeError("network down"));
  const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  await expect(
    syncR2Assets({
      r2AssetsDir,
      accountId: "test-account",
      apiToken: "test-token",
      dryRun: false,
      maxRetries: 0,
      retryBaseDelayMs: 0,
      fetchFn: mockFetch as unknown as typeof fetch,
    }),
  ).rejects.toThrow(/R2 upload failed/);

  // maxRetries is clamped to a minimum of 1, so one retry attempt is still made.
  expect(mockFetch).toHaveBeenCalledTimes(2);
  expect(errSpy).toHaveBeenCalled();
});

test("syncR2Assets honors a parseable Retry-After date header", async () => {
  const file = join(r2AssetsDir, "assets/chunks/date-retry.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('date-retry');");

  const retryAt = new Date(Date.now() + 1_000).toUTCString();
  const mockFetch = vi
    .fn()
    .mockResolvedValueOnce(
      new Response("Too Many Requests", { status: 429, headers: { "Retry-After": retryAt } }),
    )
    .mockResolvedValueOnce(new Response(null, { status: 200 }));
  const sleepSpy = vi.fn().mockResolvedValue(undefined);
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncR2Assets({
    r2AssetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    maxRetries: 1,
    fetchFn: mockFetch as unknown as typeof fetch,
    sleepFn: sleepSpy,
  });

  expect(result.uploadedFiles).toBe(1);
  expect(sleepSpy).toHaveBeenCalledWith(expect.any(Number));
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Cloudflare R2 sync complete"));
});

test("syncR2Assets falls back to the base delay when Retry-After is unparseable", async () => {
  const file = join(r2AssetsDir, "assets/chunks/garbage-retry.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('garbage-retry');");

  const mockFetch = vi
    .fn()
    .mockResolvedValueOnce(
      new Response("Too Many Requests", { status: 429, headers: { "Retry-After": "not-a-date" } }),
    )
    .mockResolvedValueOnce(new Response(null, { status: 200 }));
  const sleepSpy = vi.fn().mockResolvedValue(undefined);
  vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncR2Assets({
    r2AssetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    maxRetries: 1,
    retryBaseDelayMs: 5,
    fetchFn: mockFetch as unknown as typeof fetch,
    sleepFn: sleepSpy,
  });

  expect(result.uploadedFiles).toBe(1);
  expect(sleepSpy).toHaveBeenCalledWith(5);
});

test("syncR2Assets falls back to an empty error body when response.text() rejects", async () => {
  const file = join(r2AssetsDir, "assets/chunks/text-fails.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('text-fails');");

  const mockFetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 500,
    statusText: "Internal Server Error",
    headers: new Headers(),
    text: () => Promise.reject(new Error("body read failed")),
  });
  const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  await expect(
    syncR2Assets({
      r2AssetsDir,
      accountId: "test-account",
      apiToken: "test-token",
      dryRun: false,
      maxRetries: 1,
      retryBaseDelayMs: 0,
      fetchFn: mockFetch as unknown as typeof fetch,
    }),
  ).rejects.toThrow(/R2 upload failed/);

  expect(mockFetch).toHaveBeenCalledTimes(2);
  expect(errSpy).toHaveBeenCalled();
});

test("syncR2Assets falls back to the default assets directory under docs/.vitepress", async () => {
  const savedEnv = process.env.DOCS_CF_R2_ASSETS_DIR;
  delete process.env.DOCS_CF_R2_ASSETS_DIR;

  try {
    await expect(syncR2Assets({})).rejects.toThrow(
      /R2 assets directory does not exist.*cf-r2-assets/,
    );
  } finally {
    if (savedEnv === undefined) {
      delete process.env.DOCS_CF_R2_ASSETS_DIR;
    } else {
      process.env.DOCS_CF_R2_ASSETS_DIR = savedEnv;
    }
  }
});

test("syncR2Assets stringifies non-Error rejections in the error report", async () => {
  const file = join(r2AssetsDir, "assets/chunks/non-error.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('non-error');");

  const mockFetch = vi.fn().mockRejectedValue("plain string rejection");
  vi.spyOn(console, "error").mockImplementation(() => {});

  await expect(
    syncR2Assets({
      r2AssetsDir,
      accountId: "test-account",
      apiToken: "test-token",
      dryRun: false,
      maxRetries: 0,
      retryBaseDelayMs: 0,
      fetchFn: mockFetch as unknown as typeof fetch,
    }),
  ).rejects.toThrow(/plain string rejection/);
});

test("DEFAULT_R2_UPLOAD_CONCURRENCY is defined", () => {
  expect(DEFAULT_R2_UPLOAD_CONCURRENCY).toBeGreaterThan(0);
});

test("direct CLI execution invokes syncR2Assets", async () => {
  const savedArgv = process.argv;
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  try {
    vi.resetModules();
    vi.stubEnv("DOCS_CF_R2_ASSETS_DIR", r2AssetsDir);
    vi.stubEnv("CLOUDFLARE_R2_DRY_RUN", "true");
    process.argv = ["node", MODULE_PATH];
    await import("./sync-cloudflare-r2.ts");
    expect(logSpy).toHaveBeenCalled();
  } finally {
    process.argv = savedArgv;
    vi.unstubAllEnvs();
    logSpy.mockRestore();
  }
});
