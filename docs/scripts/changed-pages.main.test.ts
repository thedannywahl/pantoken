import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { relative } from "node:path";

interface SpawnResult {
  status: number;
  stdout: string;
  stderr: string;
}

const appendFileSync = vi.fn();
const existsSync = vi.fn<(path: string) => boolean>();
const mkdirSync = vi.fn();
const readFileSync = vi.fn<(path: string) => string>();
const spawnSync = vi.fn<(...args: unknown[]) => SpawnResult>();
const writeFileSync = vi.fn();

vi.mock("node:fs", () => ({ appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync }));
vi.mock("node:child_process", () => ({ spawnSync }));
vi.mock("../.vitepress/i18n.ts", () => ({ NON_ROOT_LOCALES: ["hu"] }));

const MODULE_PATH = new URL("./changed-pages.ts", import.meta.url).pathname;
const OUT_PATH = "/tmp/pantoken-docs-pages.json";

let outSpy: ReturnType<typeof vi.spyOn>;
let savedArgv: string[];
let savedEnv: NodeJS.ProcessEnv;
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  savedArgv = process.argv;
  savedEnv = { ...process.env };
  savedExit = process.exitCode;
  process.exitCode = undefined;
  delete process.env.CHANGED_BASE;
  delete process.env.DOCS_CHANGED_PAGES_FILE;
  delete process.env.GITHUB_OUTPUT;
  outSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
});

afterEach(() => {
  process.argv = savedArgv;
  process.env = savedEnv;
  process.exitCode = savedExit;
  vi.restoreAllMocks();
});

function printed() {
  const line = outSpy.mock.calls
    .map((c: unknown[]) => String(c[0]))
    .find((s: string) => s.trim().startsWith("{"));
  return line ? JSON.parse(line) : null;
}

test("CLI writes a changed-pages file and GitHub outputs for a page-scoped diff", async () => {
  spawnSync.mockReturnValue({ status: 0, stdout: "M\tdocs/guide/cli.md\n", stderr: "" });
  process.argv = ["node", MODULE_PATH, "--base", "origin/main", "--out", OUT_PATH];
  process.env.GITHUB_OUTPUT = "/tmp/github-output";

  await import("./changed-pages.ts");
  await vi.waitFor(() => expect(outSpy).toHaveBeenCalled());

  expect(printed()).toEqual({
    scope: "subset",
    pages: ["guide/cli.md", "hu/guide/cli.md"],
    surfaces: ["docs.guides"],
  });
  expect(spawnSync.mock.calls[0]?.[1]).toEqual(["diff", "--name-status", "origin/main...HEAD"]);
  expect(mkdirSync).toHaveBeenCalledWith("/tmp", { recursive: true });
  expect(writeFileSync).toHaveBeenCalledWith(
    OUT_PATH,
    `${JSON.stringify(["guide/cli.md", "hu/guide/cli.md"], null, 2)}\n`,
  );
  const [, body] = appendFileSync.mock.calls[0] as [string, string];
  expect(body).toContain("scope=subset");
  expect(body).toContain("page_count=2");
  expect(body).toContain(`pages_file=${relative(process.cwd(), OUT_PATH)}`);
});

test("CLI falls back to a full build without a usable diff base", async () => {
  process.argv = ["node", MODULE_PATH];

  await import("./changed-pages.ts");
  await vi.waitFor(() => expect(outSpy).toHaveBeenCalled());

  expect(printed()).toEqual({
    scope: "all",
    pages: [],
    surfaces: [],
    fallbackReason: "No usable diff base was provided.",
  });
  expect(spawnSync).not.toHaveBeenCalled();
});

test("CLI falls back to a full build when git diff fails", async () => {
  spawnSync.mockReturnValue({ status: 128, stdout: "", stderr: "bad ref" });
  process.env.CHANGED_BASE = "origin/main";
  process.argv = ["node", MODULE_PATH];

  await import("./changed-pages.ts");
  await vi.waitFor(() => expect(outSpy).toHaveBeenCalled());

  expect(printed()).toEqual({
    scope: "all",
    pages: [],
    surfaces: [],
    fallbackReason: "No usable diff base was provided.",
  });
});

test("CLI resolves POT diffs through git show and the current catalog", async () => {
  const before = [
    "#: api/classes/Button.md:4",
    'msgctxt "docs.api:prose"',
    'msgid "Old description"',
    'msgstr ""',
    "",
  ].join("\n");
  const after = [
    "#: api/classes/Button.md:4",
    'msgctxt "docs.api:prose"',
    'msgid "New description"',
    'msgstr ""',
    "",
  ].join("\n");
  spawnSync.mockImplementation((_command, args) => {
    if ((args as string[])[0] === "diff") {
      return { status: 0, stdout: "M\tl10n/docs.api.pot\n", stderr: "" };
    }
    return { status: 0, stdout: before, stderr: "" };
  });
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(after);
  process.argv = ["node", MODULE_PATH, "--base", "origin/main"];

  await import("./changed-pages.ts");
  await vi.waitFor(() => expect(outSpy).toHaveBeenCalled());

  expect(printed()).toEqual({
    scope: "subset",
    pages: ["api/classes/Button.md", "hu/api/classes/Button.md"],
    surfaces: ["docs.api"],
  });
  expect(spawnSync.mock.calls[1]?.[1]).toEqual(["show", "origin/main:l10n/docs.api.pot"]);
});

test("locale PO diffs only rebuild that locale's rendered page", async () => {
  const before = ["#: guide/cli.md:1", 'msgid "CLI"', 'msgstr ""', ""].join("\n");
  const after = ["#: guide/cli.md:1", 'msgid "CLI"', 'msgstr "Parancssor"', ""].join("\n");
  spawnSync.mockImplementation((_command, args) => {
    if ((args as string[])[0] === "diff") {
      return { status: 0, stdout: "M\tl10n/hu/docs.guides.po\n", stderr: "" };
    }
    return { status: 0, stdout: before, stderr: "" };
  });
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(after);
  process.argv = ["node", MODULE_PATH, "--base", "origin/main"];

  await import("./changed-pages.ts");
  await vi.waitFor(() => expect(outSpy).toHaveBeenCalled());

  expect(printed()).toEqual({
    scope: "subset",
    pages: ["guide/cli.md", "hu/guide/cli.md"],
    surfaces: ["docs.guides"],
  });
});

test("catalog comparison failures and non-page references force full builds", async () => {
  spawnSync.mockImplementation((_command, args) => {
    if ((args as string[])[0] === "diff") {
      return { status: 0, stdout: "M\tl10n/docs.api.pot\n", stderr: "" };
    }
    return { status: 1, stdout: "", stderr: "missing" };
  });
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue('#: glossary.ts#term\nmsgid "Term"\nmsgstr ""\n');
  process.argv = ["node", MODULE_PATH, "--base", "origin/main"];

  await import("./changed-pages.ts");
  await vi.waitFor(() => expect(outSpy).toHaveBeenCalled());

  expect(printed()).toEqual({
    scope: "all",
    pages: [],
    surfaces: [],
    fallbackReason: "Unable to compare l10n/docs.api.pot; running full docs build.",
  });
});
