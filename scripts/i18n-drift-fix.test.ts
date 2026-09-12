import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

const mocks = vi.hoisted(() => ({
  existsSync: vi.fn(() => true),
  mkdirSync: vi.fn(),
  readFileSync: vi.fn(),
  rmSync: vi.fn(),
  spawnSync: vi.fn(),
}));

const { existsSync, mkdirSync, readFileSync, rmSync, spawnSync } = mocks;

vi.mock("node:fs", () => ({ existsSync, mkdirSync, readFileSync, rmSync }));
vi.mock("node:child_process", () => ({ spawnSync }));

const findings = JSON.stringify([
  { surface: "ui.strings", locale: "hu", file: "src/i18n.json", detail: "missing" },
  { surface: "cli.scaffold", locale: "de", file: "src/i18n.json", detail: "missing" },
  { surface: "scaffold.readme", locale: "fr", file: "templates/a/README.md", detail: "missing" },
  { surface: "cli.ai", locale: "es", file: "src/i18n.json", detail: "missing" },
  { surface: "docs.guides", locale: "hu", file: "docs/guide/intro.md", detail: "missing" },
  { surface: "docs.api", locale: "de", file: "docs/api/widget.md", detail: "missing" },
  { surface: "docs.home", locale: "fr", file: "docs/index.md", detail: "missing" },
  {
    surface: "docs.chrome",
    locale: "es",
    file: "docs/.vitepress/i18n.json#nav",
    detail: "missing",
  },
  { surface: "docs.demos", locale: "it", file: "docs/demos/a/i18n.json#title", detail: "missing" },
]);

let savedArgv: string[];
let savedExitCode: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  savedArgv = process.argv;
  savedExitCode = process.exitCode;
  process.exitCode = undefined;
  process.argv = ["node", "scripts/i18n-drift-fix.ts", "--provider", "claude"];
  existsSync.mockReturnValue(true);
  readFileSync.mockReturnValue(findings);
  spawnSync.mockImplementation((_command, args) => ({
    status: (args as string[]).includes("check") ? 1 : 0,
  }));
});

afterEach(() => {
  process.argv = savedArgv;
  process.exitCode = savedExitCode;
  vi.restoreAllMocks();
});

test("fixes every selected surface from one shared docs check", async () => {
  await import("./i18n-drift-fix.ts");

  const calls = spawnSync.mock.calls.map((call) => call[1] as string[]);
  expect(calls.filter((args) => args.includes("check"))).toHaveLength(4);
  expect(calls.some((args) => args.some((arg) => arg.includes("translate-api-po.ts")))).toBe(true);
  expect(calls.some((args) => args.some((arg) => arg.includes("translate-guide-po.ts")))).toBe(
    true,
  );
  expect(calls.some((args) => args.some((arg) => arg.includes("translate-chrome-po.ts")))).toBe(
    true,
  );
  expect(calls.some((args) => args.some((arg) => arg.includes("translate-demo-po.ts")))).toBe(true);
  expect(calls.some((args) => args.some((arg) => arg.includes("sync-home-locales.ts")))).toBe(true);
  expect(rmSync).toHaveBeenCalled();
});

test("uses the Copilot provider environment for a scoped docs fix", async () => {
  process.argv = [
    "node",
    "scripts/i18n-drift-fix.ts",
    "--provider",
    "copilot",
    "--surfaces",
    "docs.home",
  ];

  await import("./i18n-drift-fix.ts");

  const homeCall = spawnSync.mock.calls.find((call) =>
    (call[1] as string[]).some((arg) => arg.includes("sync-home-locales.ts")),
  );
  expect((homeCall?.[2] as { env: NodeJS.ProcessEnv } | undefined)?.env).toMatchObject({
    DOCS_TRANSLATION_ADAPTER: "ai",
    DOCS_TRANSLATION_COMMAND: expect.stringContaining("copilot-wrapper.sh"),
    DOCS_TRANSLATION_COMMAND_ARGS: "--model gpt-5-mini --effort low",
    DOCS_TRANSLATION_LOCALE: "fr",
  });
});

test("uses the Agy provider environment for a scoped docs fix", async () => {
  process.argv = [
    "node",
    "scripts/i18n-drift-fix.ts",
    "--provider",
    "agy",
    "--surfaces",
    "docs.home",
  ];

  await import("./i18n-drift-fix.ts");

  const homeCall = spawnSync.mock.calls.find((call) =>
    (call[1] as string[]).some((arg) => arg.includes("sync-home-locales.ts")),
  );
  expect((homeCall?.[2] as { env: NodeJS.ProcessEnv } | undefined)?.env).toMatchObject({
    DOCS_TRANSLATION_COMMAND_ARGS: "--model gemini-3.6-flash-low",
  });
});

test("skips a generic surface when its findings are empty", async () => {
  process.argv = ["node", "scripts/i18n-drift-fix.ts", "--surfaces", "ui.strings"];
  readFileSync.mockReturnValue("[]");

  await import("./i18n-drift-fix.ts");

  expect(spawnSync).toHaveBeenCalledTimes(1);
  expect(spawnSync.mock.calls[0][1]).toContain("check");
});

test("reports a malformed findings artifact", async () => {
  process.argv = ["node", "scripts/i18n-drift-fix.ts", "--surfaces", "ui.strings"];
  readFileSync.mockReturnValue("{}");

  await import("./i18n-drift-fix.ts");

  expect(process.exitCode).toBe(1);
});

test("reports child-process failures and missing artifacts", async () => {
  process.argv = ["node", "scripts/i18n-drift-fix.ts", "--surfaces", "ui.strings"];
  spawnSync.mockReturnValue({ status: 2 });
  await import("./i18n-drift-fix.ts");
  expect(process.exitCode).toBe(1);

  vi.resetModules();
  process.exitCode = undefined;
  spawnSync.mockReturnValue({ status: 0 });
  existsSync.mockReturnValue(false);
  await import("./i18n-drift-fix.ts");
  expect(process.exitCode).toBe(1);
});

test("reports provider process errors and signals", async () => {
  process.argv = ["node", "scripts/i18n-drift-fix.ts", "--surfaces", "ui.strings"];
  spawnSync.mockReturnValue({ error: new Error("spawn failed") });
  await import("./i18n-drift-fix.ts");
  expect(process.exitCode).toBe(1);

  vi.resetModules();
  process.exitCode = undefined;
  spawnSync.mockReturnValue({ signal: "SIGTERM" });
  await import("./i18n-drift-fix.ts");
  expect(process.exitCode).toBe(1);
});

test("rejects an unknown provider and surface", async () => {
  process.argv = ["node", "scripts/i18n-drift-fix.ts", "--provider", "unknown"];
  await import("./i18n-drift-fix.ts");
  expect(process.exitCode).toBe(1);

  vi.resetModules();
  process.exitCode = undefined;
  process.argv = ["node", "scripts/i18n-drift-fix.ts", "--surfaces", "unknown"];
  await import("./i18n-drift-fix.ts");
  expect(process.exitCode).toBe(1);
});
