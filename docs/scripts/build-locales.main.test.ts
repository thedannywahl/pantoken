import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

interface SpawnResult {
  status: number;
}

const cpSync = vi.fn();
const existsSync = vi.fn<(path: string) => boolean>();
const mkdirSync = vi.fn();
const readFileSync = vi.fn<(path: string) => string>();
const rmSync = vi.fn();
const spawnSync = vi.fn<(...args: unknown[]) => SpawnResult>();
const writeFileSync = vi.fn();

vi.mock("node:child_process", () => ({ spawnSync }));
vi.mock("node:fs", () => ({
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
}));
vi.mock("../.vitepress/i18n.ts", () => ({
  NON_ROOT_LOCALES: ["de", "hu"],
  parseRequestedLocales: (requested: string | undefined, fallback: readonly string[]) =>
    requested ? requested.split(",") : fallback,
}));

const MODULE_PATH = new URL("./build-locales.ts", import.meta.url).pathname;

let logSpy: ReturnType<typeof vi.spyOn>;
let savedArgv: string[];
let savedEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  savedArgv = process.argv;
  savedEnv = { ...process.env };
  delete process.env.DOCS_BASE_DIST;
  delete process.env.DOCS_CHANGED_PAGES_FILE;
  delete process.env.DOCS_DIST_DIR;
  delete process.env.DOCS_LOCALES;
  existsSync.mockReturnValue(true);
  spawnSync.mockReturnValue({ status: 0 });
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  process.argv = savedArgv;
  process.env = savedEnv;
  vi.restoreAllMocks();
});

test("CLI builds requested locales and merges their deploy metadata", async () => {
  process.argv = ["node", MODULE_PATH];
  process.env.DOCS_LOCALES = "hu";
  readFileSync.mockImplementation((path) => {
    if (path.endsWith("hu/hashmap.json")) return '{"hu_guide_cli.md":"hu.js"}';
    if (path.endsWith("root/hashmap.json")) return '{"guide_cli.md":"root.js"}';
    if (path.endsWith("hu/sitemap.xml")) return "<url><loc>https://x/hu/guide/cli</loc></url>";
    if (path.endsWith("root/sitemap.xml")) return "<url><loc>https://x/guide/cli</loc></url>";
    return "";
  });

  await import("./build-locales.ts");
  await vi.waitFor(() => expect(logSpy).toHaveBeenCalled());

  expect(spawnSync).toHaveBeenCalledTimes(2);
  expect(cpSync).toHaveBeenCalledTimes(2);
  expect(writeFileSync).toHaveBeenCalledWith(
    expect.stringMatching(/hashmap\.json$/u),
    '{"hu_guide_cli.md":"hu.js","guide_cli.md":"root.js"}',
  );
  expect(writeFileSync).toHaveBeenCalledWith(
    expect.stringMatching(/sitemap\.xml$/u),
    expect.stringContaining("https://x/hu/guide/cli"),
  );
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Merged 2 locales"));
});

test("CLI overlays partial locale output onto a base deployment", async () => {
  process.argv = ["node", MODULE_PATH];
  process.env.DOCS_CHANGED_PAGES_FILE = "/tmp/changed-pages.json";
  process.env.DOCS_BASE_DIST = "/tmp/base-dist";
  readFileSync.mockImplementation((path) => {
    if (path === "/tmp/changed-pages.json") return '["hu/guide/cli.md"]';
    if (path.endsWith("base-dist/hashmap.json")) return '{"guide_cli.md":"old.js"}';
    if (path.endsWith("hu/hashmap.json")) return '{"hu_guide_cli.md":"new.js"}';
    if (path.endsWith("base-dist/sitemap.xml")) return "<url><loc>https://x/guide/cli</loc></url>";
    if (path.endsWith("hu/sitemap.xml")) return "<url><loc>https://x/hu/guide/cli</loc></url>";
    return "";
  });

  await import("./build-locales.ts");
  await vi.waitFor(() => expect(logSpy).toHaveBeenCalled());

  expect(spawnSync).toHaveBeenCalledTimes(1);
  expect(writeFileSync).toHaveBeenCalledWith(
    expect.stringMatching(/hashmap\.json$/u),
    '{"guide_cli.md":"old.js","hu_guide_cli.md":"new.js"}',
  );
  expect(writeFileSync).toHaveBeenCalledWith(
    expect.stringMatching(/sitemap\.xml$/u),
    expect.stringContaining("https://x/guide/cli"),
  );
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Merged 1 locale"));
});

test("CLI skips work when a partial build has no changed pages", async () => {
  process.argv = ["node", MODULE_PATH];
  process.env.DOCS_CHANGED_PAGES_FILE = "/tmp/changed-pages.json";
  readFileSync.mockReturnValue("[]");

  await import("./build-locales.ts");
  await vi.waitFor(() => expect(logSpy).toHaveBeenCalledWith("No locales to build."));

  expect(spawnSync).not.toHaveBeenCalled();
  expect(rmSync).not.toHaveBeenCalled();
});

test("CLI stops when a locale build fails", async () => {
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  const exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
    throw new Error("exit");
  });
  process.argv = ["node", MODULE_PATH];
  process.env.DOCS_LOCALES = "hu";
  spawnSync.mockReturnValue({ status: 1 });

  await import("./build-locales.ts");
  await vi.waitFor(() => expect(errorSpy).toHaveBeenCalledWith("✗ hu: build failed"));

  expect(exitSpy).toHaveBeenCalledWith(1);
  expect(cpSync).not.toHaveBeenCalled();
});
