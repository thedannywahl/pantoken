import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import {
  BUCKET_PATH_PREFIXES,
  isBucketAssetPath,
  MAX_SITE_FILE_SIZE_BYTES,
  MAX_SITE_FILES,
  prepareDeploy,
} from "./prepare-deploy.ts";

const MODULE_PATH = new URL("./prepare-deploy.ts", import.meta.url).pathname;

let tempDir: string;
let distDir: string;
let siteDir: string;
let assetsDir: string;
let manifestPath: string;

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), "deploy-test-"));
  distDir = join(tempDir, "dist");
  siteDir = join(tempDir, "deploy-site");
  assetsDir = join(tempDir, "deploy-assets");
  manifestPath = join(tempDir, "manifest.json");
  mkdirSync(distDir, { recursive: true });
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("isBucketAssetPath separates bucket paths from static site paths", () => {
  expect(isBucketAssetPath("assets/hu/chunks/framework.123.js")).toBe(true);
  expect(isBucketAssetPath("demos-assets/focus-outline.css")).toBe(true);
  expect(isBucketAssetPath("demos-assets/site-themes.css")).toBe(true);
  expect(isBucketAssetPath("assets/index.js")).toBe(true);
  expect(isBucketAssetPath("assets")).toBe(true);

  expect(isBucketAssetPath("index.html")).toBe(false);
  expect(isBucketAssetPath("hu/index.html")).toBe(false);
  expect(isBucketAssetPath("r/registry.json")).toBe(false);
  expect(isBucketAssetPath("r/button.json")).toBe(false);
  expect(isBucketAssetPath("sitemap.xml")).toBe(false);
  expect(isBucketAssetPath("hashmap.json")).toBe(false);
  expect(isBucketAssetPath("favicon.ico")).toBe(false);
});

test("prepareDeploy splits dist into site and asset trees with manifest", async () => {
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

  const manifest = await prepareDeploy({
    distDir,
    siteDir,
    assetsDir,
    manifestPath,
  });

  expect(manifest.site.count).toBe(5);
  expect(manifest.assets.count).toBe(3);
  expect(manifest.site.largestFile?.path).toBeDefined();
  expect(manifest.assets.largestFile?.path).toBeDefined();

  expect(existsSync(join(siteDir, "index.html"))).toBe(true);
  expect(existsSync(join(siteDir, "r", "registry.json"))).toBe(true);
  expect(existsSync(join(siteDir, "hu", "guide", "cli.html"))).toBe(true);
  expect(existsSync(join(siteDir, "assets", "chunks", "app.123.js"))).toBe(false);

  expect(existsSync(join(assetsDir, "assets", "chunks", "app.123.js"))).toBe(true);
  expect(existsSync(join(assetsDir, "assets", "hu", "chunks", "page.456.js"))).toBe(true);
  expect(existsSync(join(assetsDir, "demos-assets", "style.css"))).toBe(true);
  expect(existsSync(join(assetsDir, "index.html"))).toBe(false);

  // Verify manifest written to disk
  expect(existsSync(manifestPath)).toBe(true);
  const diskManifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  expect(diskManifest.site.count).toBe(5);
  expect(diskManifest.assets.count).toBe(3);

  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Deploy prepared"));
});

test("prepareDeploy throws when source directory does not exist", async () => {
  await expect(
    prepareDeploy({
      distDir: join(tempDir, "nonexistent"),
      siteDir,
      assetsDir,
      manifestPath,
    }),
  ).rejects.toThrow(/Source dist directory does not exist/);
});

test("prepareDeploy throws when a site file exceeds size limit", async () => {
  const hugeFile = join(distDir, "huge.html");
  writeFileSync(hugeFile, "1234567890");

  await expect(
    prepareDeploy({
      distDir,
      siteDir,
      assetsDir,
      manifestPath,
      maxSiteFileSizeBytes: 5,
    }),
  ).rejects.toThrow(/exceeds the static site per-file limit/);
});

test("prepareDeploy throws when site file count exceeds limit", async () => {
  writeFileSync(join(distDir, "a.html"), "a");
  writeFileSync(join(distDir, "b.html"), "b");

  await expect(
    prepareDeploy({
      distDir,
      siteDir,
      assetsDir,
      manifestPath,
      maxSiteFiles: 1,
    }),
  ).rejects.toThrow(/Static site tree contains 2 files, exceeding limit of 1/);
});

test("prepareDeploy constants are correctly defined", () => {
  expect(MAX_SITE_FILES).toBe(100_000);
  expect(MAX_SITE_FILE_SIZE_BYTES).toBe(25 * 1024 * 1024);
  expect(BUCKET_PATH_PREFIXES).toContain("assets");
  expect(BUCKET_PATH_PREFIXES).toContain("demos-assets");
});

test("direct CLI execution invokes prepareDeploy", async () => {
  writeFileSync(join(distDir, "index.html"), "test");
  const savedArgv = process.argv;
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  try {
    vi.resetModules();
    vi.stubEnv("DOCS_DIST_DIR", distDir);
    vi.stubEnv("DOCS_DEPLOY_SITE_DIR", siteDir);
    vi.stubEnv("DOCS_DEPLOY_ASSETS_DIR", assetsDir);
    vi.stubEnv("DOCS_DEPLOY_MANIFEST_PATH", manifestPath);
    process.argv = ["node", MODULE_PATH];
    await import("./prepare-deploy.ts");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Deploy prepared"));
  } finally {
    process.argv = savedArgv;
    vi.unstubAllEnvs();
    logSpy.mockRestore();
  }
});
