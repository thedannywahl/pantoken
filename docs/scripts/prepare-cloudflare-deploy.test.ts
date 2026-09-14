import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import {
  isR2AssetPath,
  prepareCloudflareDeploy,
  MAX_WORKER_STATIC_FILES,
  MAX_WORKER_STATIC_FILE_SIZE_BYTES,
  R2_PATH_PREFIXES,
} from "./prepare-cloudflare-deploy.ts";

const MODULE_PATH = new URL("./prepare-cloudflare-deploy.ts", import.meta.url).pathname;

let tempDir: string;
let distDir: string;
let workerDistDir: string;
let r2AssetsDir: string;
let manifestPath: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), "cf-deploy-test-"));
  distDir = join(tempDir, "dist");
  workerDistDir = join(tempDir, "cf-worker-dist");
  r2AssetsDir = join(tempDir, "cf-r2-assets");
  manifestPath = join(tempDir, "manifest.json");
  mkdirSync(distDir, { recursive: true });
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("isR2AssetPath correctly identifies R2 vs Worker static paths", () => {
  expect(isR2AssetPath("assets/hu/chunks/framework.123.js")).toBe(true);
  expect(isR2AssetPath("demos-assets/focus-outline.css")).toBe(true);
  expect(isR2AssetPath("demos-assets/site-themes.css")).toBe(true);
  expect(isR2AssetPath("assets/index.js")).toBe(true);
  expect(isR2AssetPath("assets")).toBe(true);

  expect(isR2AssetPath("index.html")).toBe(false);
  expect(isR2AssetPath("hu/index.html")).toBe(false);
  expect(isR2AssetPath("r/registry.json")).toBe(false);
  expect(isR2AssetPath("r/button.json")).toBe(false);
  expect(isR2AssetPath("sitemap.xml")).toBe(false);
  expect(isR2AssetPath("hashmap.json")).toBe(false);
  expect(isR2AssetPath("favicon.ico")).toBe(false);
});

test("prepareCloudflareDeploy splits dist into worker and r2 trees with manifest", async () => {
  // Create mock dist structure
  const files: Record<string, string> = {
    "index.html": "<html>Root</html>",
    "404.html": "<html>404</html>",
    "sitemap.xml": "<xml>sitemap</xml>",
    "r/registry.json": '{"items":[]}',
    "hu/guide/cli.html": "<html>CLI</html>",
    "assets/chunks/app.123.js": "console.log('app');",
    "assets/hu/chunks/page.456.js": "console.log('hu page');",
    "demos-assets/style.css": "body { color: red; }",
  };

  for (const [relPath, content] of Object.entries(files)) {
    const fullPath = join(distDir, relPath);
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, content);
  }

  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  const manifest = await prepareCloudflareDeploy({
    distDir,
    workerDistDir,
    r2AssetsDir,
    manifestPath,
  });

  expect(manifest.worker.count).toBe(5);
  expect(manifest.r2.count).toBe(3);
  expect(manifest.worker.largestFile?.path).toBeDefined();
  expect(manifest.r2.largestFile?.path).toBeDefined();

  // Verify worker files exist
  expect(existsSync(join(workerDistDir, "index.html"))).toBe(true);
  expect(existsSync(join(workerDistDir, "r", "registry.json"))).toBe(true);
  expect(existsSync(join(workerDistDir, "hu", "guide", "cli.html"))).toBe(true);
  expect(existsSync(join(workerDistDir, "assets", "chunks", "app.123.js"))).toBe(false);

  // Verify R2 files exist
  expect(existsSync(join(r2AssetsDir, "assets", "chunks", "app.123.js"))).toBe(true);
  expect(existsSync(join(r2AssetsDir, "assets", "hu", "chunks", "page.456.js"))).toBe(true);
  expect(existsSync(join(r2AssetsDir, "demos-assets", "style.css"))).toBe(true);
  expect(existsSync(join(r2AssetsDir, "index.html"))).toBe(false);

  // Verify manifest written to disk
  expect(existsSync(manifestPath)).toBe(true);
  const diskManifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  expect(diskManifest.worker.count).toBe(5);
  expect(diskManifest.r2.count).toBe(3);

  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Cloudflare deploy prepared"));
});

test("prepareCloudflareDeploy throws when source directory does not exist", async () => {
  await expect(
    prepareCloudflareDeploy({
      distDir: join(tempDir, "nonexistent"),
      workerDistDir,
      r2AssetsDir,
      manifestPath,
    }),
  ).rejects.toThrow(/Source dist directory does not exist/);
});

test("prepareCloudflareDeploy throws when a worker file exceeds size limit", async () => {
  const hugeFile = join(distDir, "huge.html");
  writeFileSync(hugeFile, "1234567890");

  await expect(
    prepareCloudflareDeploy({
      distDir,
      workerDistDir,
      r2AssetsDir,
      manifestPath,
      maxWorkerFileSizeBytes: 5,
    }),
  ).rejects.toThrow(/exceeds Cloudflare Workers Static Assets limit/);
});

test("prepareCloudflareDeploy throws when worker file count exceeds limit", async () => {
  writeFileSync(join(distDir, "a.html"), "a");
  writeFileSync(join(distDir, "b.html"), "b");

  await expect(
    prepareCloudflareDeploy({
      distDir,
      workerDistDir,
      r2AssetsDir,
      manifestPath,
      maxWorkerFiles: 1,
    }),
  ).rejects.toThrow(/Worker Static Assets tree contains 2 files, exceeding limit of 1/);
});

test("prepareCloudflareDeploy constants are correctly defined", () => {
  expect(MAX_WORKER_STATIC_FILES).toBe(100_000);
  expect(MAX_WORKER_STATIC_FILE_SIZE_BYTES).toBe(25 * 1024 * 1024);
  expect(R2_PATH_PREFIXES).toContain("assets");
  expect(R2_PATH_PREFIXES).toContain("demos-assets");
});

test("direct CLI execution invokes prepareCloudflareDeploy", async () => {
  writeFileSync(join(distDir, "index.html"), "test");
  const savedArgv = process.argv;
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  try {
    vi.resetModules();
    vi.stubEnv("DOCS_DIST_DIR", distDir);
    vi.stubEnv("DOCS_CF_WORKER_DIST_DIR", workerDistDir);
    vi.stubEnv("DOCS_CF_R2_ASSETS_DIR", r2AssetsDir);
    vi.stubEnv("DOCS_CF_MANIFEST_PATH", manifestPath);
    process.argv = ["node", MODULE_PATH];
    await import("./prepare-cloudflare-deploy.ts");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Cloudflare deploy prepared"));
  } finally {
    process.argv = savedArgv;
    vi.unstubAllEnvs();
    logSpy.mockRestore();
  }
});
