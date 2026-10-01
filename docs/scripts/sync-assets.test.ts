import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import {
  assertAssetPathUnderRoot,
  DEFAULT_ASSET_UPLOAD_CONCURRENCY,
  syncAssets,
} from "./sync-assets.ts";

const MODULE_PATH = new URL("./sync-assets.ts", import.meta.url).pathname;

/** Empty List Objects response, so tests that don't exercise diffing can ignore the list call. */
const emptyListResponse = (): Response =>
  new Response(JSON.stringify({ result: [], result_info: { is_truncated: false } }), {
    status: 200,
  });

const md5Hex = (content: string): string => createHash("md5").update(content).digest("hex");

let tempDir: string;
let assetsDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), "asset-sync-test-"));
  assetsDir = join(tempDir, "deploy-assets");
  mkdirSync(assetsDir, { recursive: true });
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("syncAssets performs dry-run when credentials are not supplied", async () => {
  const file1 = join(assetsDir, "assets/chunks/app.js");
  const file2 = join(assetsDir, "demos-assets/style.css");
  mkdirSync(dirname(file1), { recursive: true });
  mkdirSync(dirname(file2), { recursive: true });
  writeFileSync(file1, "console.log(1);");
  writeFileSync(file2, "body { color: red; }");

  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncAssets({
    assetsDir,
    dryRun: true,
  });

  expect(result.totalFiles).toBe(2);
  expect(result.uploadedFiles).toBe(0);
  expect(result.skippedFiles).toBe(2);
  expect(result.totalBytes).toBeGreaterThan(0);
  expect(result.errors).toHaveLength(0);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("dry run"));
});

test("syncAssets throws when directory does not exist", async () => {
  await expect(
    syncAssets({
      assetsDir: join(tempDir, "nonexistent"),
    }),
  ).rejects.toThrow(/Deploy assets directory does not exist/);
});

test("syncAssets throws when credentials are missing in non-dry-run mode", async () => {
  await expect(
    syncAssets({
      assetsDir,
      dryRun: false,
      accountId: "",
      apiToken: "",
    }),
  ).rejects.toThrow(/Missing storage credentials/);
});

test("assertAssetPathUnderRoot rejects paths outside the configured asset directory", () => {
  expect(() => assertAssetPathUnderRoot(assetsDir, join(assetsDir, "..", "outside.txt"))).toThrow(
    /outside the asset directory/i,
  );

  expect(() =>
    assertAssetPathUnderRoot(assetsDir, join(assetsDir, "assets", "app.js")),
  ).not.toThrow();
});

test("syncAssets uploads files with authorization and content type headers", async () => {
  const file1 = join(assetsDir, "assets/chunks/app.123.js");
  const file2 = join(assetsDir, "demos-assets/style.css");
  mkdirSync(dirname(file1), { recursive: true });
  mkdirSync(dirname(file2), { recursive: true });
  writeFileSync(file1, "console.log('app');");
  writeFileSync(file2, "body { margin: 0; }");

  const uploadedUrls: string[] = [];
  const mockFetch = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
    if (init?.method !== "PUT") {
      return Promise.resolve(emptyListResponse());
    }
    uploadedUrls.push(url);
    expect(init?.method).toBe("PUT");
    expect((init?.headers as Record<string, string>)?.Authorization).toBe("Bearer test-token");
    return Promise.resolve(new Response(null, { status: 200 }));
  });

  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncAssets({
    assetsDir,
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
  expect(mockFetch).toHaveBeenCalledTimes(3);
  expect(uploadedUrls).toContainEqual(
    expect.stringMatching(
      /\/test-account\/.*\/test-bucket\/objects\/assets\/chunks\/app\.123\.js$/u,
    ),
  );
  expect(uploadedUrls).toContainEqual(
    expect.stringMatching(/\/test-account\/.*\/test-bucket\/objects\/demos-assets\/style\.css$/u),
  );
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Asset sync complete"));
});

test("syncAssets retries rate-limited uploads before reporting success", async () => {
  const file = join(assetsDir, "assets/chunks/rate-limited.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('retry');");

  const mockFetch = vi
    .fn()
    .mockResolvedValueOnce(emptyListResponse())
    .mockResolvedValueOnce(
      new Response("Too Many Requests", { status: 429, headers: { "Retry-After": "0" } }),
    )
    .mockResolvedValueOnce(new Response(null, { status: 200 }));
  const sleepSpy = vi.fn().mockResolvedValue(undefined);
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncAssets({
    assetsDir,
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
  expect(mockFetch).toHaveBeenCalledTimes(3);
  expect(sleepSpy).toHaveBeenCalledWith(0);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Asset sync complete"));
});

test("syncAssets does not retry non-retryable upload errors", async () => {
  const file = join(assetsDir, "assets/chunks/unauthorized.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "no retry");

  const mockFetch = vi
    .fn()
    .mockResolvedValue(new Response("Unauthorized", { status: 401, statusText: "Unauthorized" }));
  const sleepSpy = vi.fn().mockResolvedValue(undefined);
  const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  await expect(
    syncAssets({
      assetsDir,
      accountId: "test-account",
      apiToken: "bad-token",
      dryRun: false,
      maxRetries: 3,
      retryBaseDelayMs: 0,
      fetchFn: mockFetch as unknown as typeof fetch,
      sleepFn: sleepSpy,
    }),
  ).rejects.toThrow(/Asset upload failed/);

  // one list call (also 401, non-fatal) plus one non-retryable PUT attempt.
  expect(mockFetch).toHaveBeenCalledTimes(2);
  expect(sleepSpy).not.toHaveBeenCalled();
  expect(errSpy).toHaveBeenCalled();
});

test("syncAssets handles and throws on upload errors", async () => {
  const file = join(assetsDir, "assets/chunks/error.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "error");

  const mockFetch = vi
    .fn()
    .mockResolvedValue(new Response("Unauthorized", { status: 401, statusText: "Unauthorized" }));
  const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  await expect(
    syncAssets({
      assetsDir,
      accountId: "test-account",
      apiToken: "bad-token",
      dryRun: false,
      fetchFn: mockFetch as unknown as typeof fetch,
    }),
  ).rejects.toThrow(/Asset upload failed/);

  expect(errSpy).toHaveBeenCalled();
});

test("walkFiles skips entries that are neither files nor directories", async () => {
  const file = join(assetsDir, "assets/kept.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('kept');");
  symlinkSync(join(tempDir, "missing-target"), join(assetsDir, "broken-link"));

  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncAssets({ assetsDir, dryRun: true });

  expect(result.totalFiles).toBe(1);
  expect(logSpy).toHaveBeenCalled();
});

test("syncAssets retries on network errors using the default sleep implementation", async () => {
  const file = join(assetsDir, "assets/chunks/flaky.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('flaky');");

  const mockFetch = vi
    .fn()
    .mockResolvedValueOnce(emptyListResponse())
    .mockRejectedValueOnce(new TypeError("network down"))
    .mockResolvedValueOnce(new Response(null, { status: 200 }));
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncAssets({
    assetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    maxRetries: 1,
    retryBaseDelayMs: 0,
    fetchFn: mockFetch as unknown as typeof fetch,
  });

  expect(result.uploadedFiles).toBe(1);
  expect(result.errors).toHaveLength(0);
  expect(mockFetch).toHaveBeenCalledTimes(3);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Asset sync complete"));
});

test("syncAssets records an error after exhausting retries on network errors", async () => {
  const file = join(assetsDir, "assets/chunks/down.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('down');");

  const mockFetch = vi.fn().mockRejectedValue(new TypeError("network down"));
  const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  await expect(
    syncAssets({
      assetsDir,
      accountId: "test-account",
      apiToken: "test-token",
      dryRun: false,
      maxRetries: 0,
      retryBaseDelayMs: 0,
      fetchFn: mockFetch as unknown as typeof fetch,
    }),
  ).rejects.toThrow(/Asset upload failed/);

  // one failed list call, plus two PUT attempts (maxRetries is clamped to a minimum of 1).
  expect(mockFetch).toHaveBeenCalledTimes(3);
  expect(errSpy).toHaveBeenCalled();
});

test("syncAssets honors a parseable Retry-After date header", async () => {
  const file = join(assetsDir, "assets/chunks/date-retry.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('date-retry');");

  const retryAt = new Date(Date.now() + 1_000).toUTCString();
  const mockFetch = vi
    .fn()
    .mockResolvedValueOnce(emptyListResponse())
    .mockResolvedValueOnce(
      new Response("Too Many Requests", { status: 429, headers: { "Retry-After": retryAt } }),
    )
    .mockResolvedValueOnce(new Response(null, { status: 200 }));
  const sleepSpy = vi.fn().mockResolvedValue(undefined);
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncAssets({
    assetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    maxRetries: 1,
    fetchFn: mockFetch as unknown as typeof fetch,
    sleepFn: sleepSpy,
  });

  expect(result.uploadedFiles).toBe(1);
  expect(sleepSpy).toHaveBeenCalledWith(expect.any(Number));
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Asset sync complete"));
});

test("syncAssets falls back to the base delay when Retry-After is unparseable", async () => {
  const file = join(assetsDir, "assets/chunks/garbage-retry.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('garbage-retry');");

  const mockFetch = vi
    .fn()
    .mockResolvedValueOnce(emptyListResponse())
    .mockResolvedValueOnce(
      new Response("Too Many Requests", { status: 429, headers: { "Retry-After": "not-a-date" } }),
    )
    .mockResolvedValueOnce(new Response(null, { status: 200 }));
  const sleepSpy = vi.fn().mockResolvedValue(undefined);
  vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncAssets({
    assetsDir,
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

test("syncAssets falls back to an empty error body when response.text() rejects", async () => {
  const file = join(assetsDir, "assets/chunks/text-fails.js");
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
    syncAssets({
      assetsDir,
      accountId: "test-account",
      apiToken: "test-token",
      dryRun: false,
      maxRetries: 1,
      retryBaseDelayMs: 0,
      fetchFn: mockFetch as unknown as typeof fetch,
    }),
  ).rejects.toThrow(/Asset upload failed/);

  // one failed (ok: false) list call, plus two PUT attempts.
  expect(mockFetch).toHaveBeenCalledTimes(3);
  expect(errSpy).toHaveBeenCalled();
});

test("syncAssets skips uploading a file whose size and MD5 already match the bucket", async () => {
  const file = join(assetsDir, "assets/chunks/unchanged.js");
  mkdirSync(dirname(file), { recursive: true });
  const content = "console.log('unchanged');";
  writeFileSync(file, content);

  const mockFetch = vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
    if (init?.method === "PUT") {
      throw new Error("should not upload an unchanged file");
    }
    return Promise.resolve(
      new Response(
        JSON.stringify({
          result: [
            {
              key: "assets/chunks/unchanged.js",
              etag: md5Hex(content),
              size: Buffer.byteLength(content),
            },
          ],
          result_info: { is_truncated: false },
        }),
        { status: 200 },
      ),
    );
  });
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncAssets({
    assetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    fetchFn: mockFetch as unknown as typeof fetch,
  });

  expect(result.uploadedFiles).toBe(0);
  expect(result.skippedFiles).toBe(1);
  expect(result.errors).toHaveLength(0);
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("1 unchanged"));
});

test("syncAssets re-uploads a file whose remote content differs", async () => {
  const file = join(assetsDir, "assets/chunks/changed.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('new content');");

  const mockFetch = vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
    if (init?.method === "PUT") {
      return Promise.resolve(new Response(null, { status: 200 }));
    }
    return Promise.resolve(
      new Response(
        JSON.stringify({
          result: [{ key: "assets/chunks/changed.js", etag: md5Hex("stale content"), size: 14 }],
          result_info: { is_truncated: false },
        }),
        { status: 200 },
      ),
    );
  });
  vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncAssets({
    assetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    fetchFn: mockFetch as unknown as typeof fetch,
  });

  expect(result.uploadedFiles).toBe(1);
  expect(result.skippedFiles).toBe(0);
});

test("syncAssets follows List Objects pagination cursors", async () => {
  const file = join(assetsDir, "assets/chunks/paged.js");
  mkdirSync(dirname(file), { recursive: true });
  const content = "console.log('paged');";
  writeFileSync(file, content);

  const mockFetch = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
    if (init?.method === "PUT") {
      throw new Error("should not upload an unchanged file");
    }
    const cursor = new URL(url).searchParams.get("cursor");
    if (!cursor) {
      return Promise.resolve(
        new Response(
          JSON.stringify({ result: [], result_info: { is_truncated: true, cursor: "page-2" } }),
          { status: 200 },
        ),
      );
    }
    return Promise.resolve(
      new Response(
        JSON.stringify({
          result: [
            {
              key: "assets/chunks/paged.js",
              etag: md5Hex(content),
              size: Buffer.byteLength(content),
            },
          ],
          result_info: { is_truncated: false },
        }),
        { status: 200 },
      ),
    );
  });

  const result = await syncAssets({
    assetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    fetchFn: mockFetch as unknown as typeof fetch,
  });

  expect(result.skippedFiles).toBe(1);
  expect(result.uploadedFiles).toBe(0);
  expect(mockFetch).toHaveBeenCalledTimes(2);
});

test("syncAssets uploads everything when listing existing objects fails", async () => {
  const file = join(assetsDir, "assets/chunks/list-fails.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('list-fails');");

  const mockFetch = vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
    if (init?.method === "PUT") {
      return Promise.resolve(new Response(null, { status: 200 }));
    }
    return Promise.resolve(new Response("Forbidden", { status: 403, statusText: "Forbidden" }));
  });
  const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "log").mockImplementation(() => {});

  const result = await syncAssets({
    assetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    fetchFn: mockFetch as unknown as typeof fetch,
  });

  expect(result.uploadedFiles).toBe(1);
  expect(result.errors).toHaveLength(0);
  expect(errSpy).toHaveBeenCalledWith(
    expect.stringContaining("Could not list existing bucket objects"),
  );
});

test("syncAssets falls back to the default assets directory under docs/.vitepress", async () => {
  const savedEnv = process.env.DOCS_DEPLOY_ASSETS_DIR;
  delete process.env.DOCS_DEPLOY_ASSETS_DIR;

  try {
    await expect(syncAssets({})).rejects.toThrow(
      /Deploy assets directory does not exist.*deploy-assets/,
    );
  } finally {
    if (savedEnv === undefined) {
      delete process.env.DOCS_DEPLOY_ASSETS_DIR;
    } else {
      process.env.DOCS_DEPLOY_ASSETS_DIR = savedEnv;
    }
  }
});

test("syncAssets stringifies non-Error rejections in the error report", async () => {
  const file = join(assetsDir, "assets/chunks/non-error.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('non-error');");

  const mockFetch = vi.fn().mockRejectedValue("plain string rejection");
  vi.spyOn(console, "error").mockImplementation(() => {});

  await expect(
    syncAssets({
      assetsDir,
      accountId: "test-account",
      apiToken: "test-token",
      dryRun: false,
      maxRetries: 0,
      retryBaseDelayMs: 0,
      fetchFn: mockFetch as unknown as typeof fetch,
    }),
  ).rejects.toThrow(/plain string rejection/);
});

test("syncAssets writes a GITHUB_STEP_SUMMARY table when the env var is set", async () => {
  const file = join(assetsDir, "assets/chunks/summary.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('summary');");
  const summaryPath = join(tempDir, "step-summary.md");
  writeFileSync(summaryPath, "");

  const mockFetch = vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
    if (init?.method === "PUT") return Promise.resolve(new Response(null, { status: 200 }));
    return Promise.resolve(emptyListResponse());
  });
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.stubEnv("GITHUB_STEP_SUMMARY", summaryPath);

  try {
    await syncAssets({
      assetsDir,
      accountId: "test-account",
      apiToken: "test-token",
      bucketName: "test-bucket",
      dryRun: false,
      fetchFn: mockFetch as unknown as typeof fetch,
    });
  } finally {
    vi.unstubAllEnvs();
  }

  const summary = readFileSync(summaryPath, "utf8");
  expect(summary).toContain("Asset sync");
  expect(summary).toContain("test-bucket");
});

test("syncAssets tolerates a GITHUB_STEP_SUMMARY path it can't write to", async () => {
  const file = join(assetsDir, "assets/chunks/summary-fail.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('summary-fail');");

  const mockFetch = vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
    if (init?.method === "PUT") return Promise.resolve(new Response(null, { status: 200 }));
    return Promise.resolve(emptyListResponse());
  });
  vi.spyOn(console, "log").mockImplementation(() => {});
  // A directory path, not a file: appendFileSync must throw, and the sync must still succeed.
  vi.stubEnv("GITHUB_STEP_SUMMARY", tempDir);

  try {
    const result = await syncAssets({
      assetsDir,
      accountId: "test-account",
      apiToken: "test-token",
      dryRun: false,
      fetchFn: mockFetch as unknown as typeof fetch,
    });
    expect(result.uploadedFiles).toBe(1);
  } finally {
    vi.unstubAllEnvs();
  }
});

test("syncAssets logs upload progress on a heartbeat interval", async () => {
  const file = join(assetsDir, "assets/chunks/slow.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('slow');");

  const mockFetch = vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
    if (init?.method !== "PUT") return Promise.resolve(emptyListResponse());
    return new Promise((resolveFetch) => {
      setTimeout(() => resolveFetch(new Response(null, { status: 200 })), 30);
    });
  });
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  await syncAssets({
    assetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    progressIntervalMs: 5,
    fetchFn: mockFetch as unknown as typeof fetch,
  });

  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("sync progress"));
});

test("syncAssets can disable the progress heartbeat", async () => {
  const file = join(assetsDir, "assets/chunks/no-heartbeat.js");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "console.log('no-heartbeat');");

  const mockFetch = vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
    if (init?.method === "PUT") return Promise.resolve(new Response(null, { status: 200 }));
    return Promise.resolve(emptyListResponse());
  });
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  await syncAssets({
    assetsDir,
    accountId: "test-account",
    apiToken: "test-token",
    dryRun: false,
    progressIntervalMs: 0,
    fetchFn: mockFetch as unknown as typeof fetch,
  });

  expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining("sync progress"));
});

test("DEFAULT_ASSET_UPLOAD_CONCURRENCY is defined", () => {
  expect(DEFAULT_ASSET_UPLOAD_CONCURRENCY).toBeGreaterThan(0);
});

test("direct CLI execution invokes syncAssets", async () => {
  const savedArgv = process.argv;
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  try {
    vi.resetModules();
    vi.stubEnv("DOCS_DEPLOY_ASSETS_DIR", assetsDir);
    vi.stubEnv("DOCS_ASSETS_DRY_RUN", "true");
    process.argv = ["node", MODULE_PATH];
    await import("./sync-assets.ts");
    expect(logSpy).toHaveBeenCalled();
  } finally {
    process.argv = savedArgv;
    vi.unstubAllEnvs();
    logSpy.mockRestore();
  }
});
