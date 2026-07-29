import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { buildManifest, type Manifest } from "./lib.ts";
import type { Theme, Token } from "@pantoken/tokens";
import type { Provenance } from "@pantoken/tokens/meta";

/**
 * The runner (`index.ts`) is a top-level script: importing it executes the whole flow. These tests
 * mock its inputs (the live token build, the deprecation ledger, and the filesystem) and drive each
 * exit path by re-importing the module with different state. Real `./lib.ts` runs underneath.
 */

const provenance: Provenance = {
  designTokens: {
    package: "@instructure/instructure-design-tokens",
    ref: "v1.5.0",
    commit: "abcdef012345",
  },
  uiIcons: { package: "@instructure/ui-icons", resolved: "11.7.3" },
};

const tok = (name: string, value: string, extra: Partial<Token> = {}): Token => ({
  name,
  syntax: "<color>",
  inherits: true,
  value,
  ...extra,
});

const currentTokens: Token[] = [tok("--a", "#111111")];
const themes = { rebrand: currentTokens } as Record<Theme, Token[]>;

/** The manifest the runner will build from the mocked live token set. */
const currentManifest = (): Manifest => buildManifest({ themes, provenance });

// Mutable state the mocks read; each test sets it before importing the runner.
const state = vi.hoisted(() => ({
  due: [] as { token: string; removeIn: string }[],
  covers: false,
  existsBaseline: true,
  baselineJson: "",
  ledgerJson: "{}",
}));

vi.mock(import("@pantoken/tokens"), () => ({
  get themes() {
    return themes as unknown as Record<Theme, Token[]>;
  },
}));
vi.mock(import("@pantoken/tokens/meta"), () => ({
  get provenance() {
    return provenance;
  },
}));
vi.mock("@pantoken/plugin-deprecations", () => ({
  dueForRemoval: () => state.due,
  ledgerCovers: () => state.covers,
}));

const writeFileSync = vi.fn();
const mkdirSync = vi.fn();
vi.mock("node:fs", () => ({
  existsSync: (p: string) =>
    String(p).endsWith("baseline/manifest.json") ? state.existsBaseline : true,
  readFileSync: (p: string) => {
    if (String(p).endsWith("baseline/manifest.json")) {
      if (!state.existsBaseline) {
        const error = new Error("ENOENT: no such file or directory");
        (error as NodeJS.ErrnoException).code = "ENOENT";
        throw error;
      }
      return state.baselineJson;
    }
    return state.ledgerJson;
  },
  writeFileSync: (...args: unknown[]) => writeFileSync(...args),
  mkdirSync: (...args: unknown[]) => mkdirSync(...args),
}));

class ExitError extends Error {
  constructor(public code: number | undefined) {
    super(`exit ${String(code)}`);
  }
}

let exitSpy: ReturnType<typeof vi.spyOn>;
let logSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.clearAllMocks();
  state.due = [];
  state.covers = false;
  state.existsBaseline = true;
  state.baselineJson = JSON.stringify(currentManifest()); // equal to current by default
  state.ledgerJson = "{}";
  exitSpy = vi.spyOn(process, "exit").mockImplementation(((code?: number) => {
    throw new ExitError(code);
  }) as never);
  logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
  errSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  exitSpy.mockRestore();
  logSpy.mockRestore();
  errSpy.mockRestore();
  process.argv = process.argv.filter((a) => a !== "--bless");
});

/** Run the runner once with the current mock state; returns the exit code (undefined if it never exits). */
async function run(bless: boolean): Promise<number | undefined> {
  process.argv = ["node", "index.ts", ...(bless ? ["--bless"] : [])];
  vi.resetModules();
  try {
    await import("./index.ts");
    return undefined;
  } catch (error) {
    if (error instanceof ExitError) return error.code;
    throw error;
  }
}

test("check: matching baseline passes with no exit", async () => {
  const code = await run(false);
  expect(code).toBeUndefined();
  // Report files are written, and the success line is printed.
  const written = writeFileSync.mock.calls.map(([p]) => String(p));
  expect(written.some((p) => p.endsWith("report.json"))).toBe(true);
  expect(written.some((p) => p.endsWith("report.md"))).toBe(true);
  expect(logSpy.mock.calls.flat().join("\n")).toContain("no unblessed drift");
});

test("check: a stale baseline exits 1", async () => {
  // Baseline carries an extra token the current build no longer has → not equal.
  state.baselineJson = JSON.stringify(
    buildManifest({
      themes: { rebrand: [...currentTokens, tok("--extra", "#222222")] } as Record<Theme, Token[]>,
      provenance,
    }),
  );
  const code = await run(false);
  expect(code).toBe(1);
  expect(errSpy.mock.calls.flat().join("\n")).toContain("baseline is stale");
});

test("check: no baseline exits 1 with a bootstrap hint", async () => {
  state.existsBaseline = false;
  const code = await run(false);
  expect(code).toBe(1);
  expect(errSpy.mock.calls.flat().join("\n")).toContain("no baseline");
});

test("check: an equal baseline but a due deprecation exits 1 and notes it in the report", async () => {
  state.due = [{ token: "--old", removeIn: "v1.6" }];
  const code = await run(false);
  expect(code).toBe(1);
  const md = writeFileSync.mock.calls.find(([p]) => String(p).endsWith("report.md"))?.[1] as string;
  expect(md).toContain("Deprecations due for removal");
  expect(errSpy.mock.calls.flat().join("\n")).toContain("reached their removeIn");
});

test("bless: retirement-due deprecations block the bless", async () => {
  state.due = [{ token: "--old", removeIn: "v1.6" }];
  const code = await run(true);
  expect(code).toBe(1);
  expect(errSpy.mock.calls.flat().join("\n")).toContain("must be retired");
  expect(writeFileSync).not.toHaveBeenCalled();
});

test("bless: an uncovered dropped token blocks the bless", async () => {
  // Previous baseline had a token that's gone now, with no ledger coverage and not a shim.
  state.baselineJson = JSON.stringify(
    buildManifest({
      themes: { rebrand: [...currentTokens, tok("--dropped", "#222222")] } as Record<
        Theme,
        Token[]
      >,
      provenance,
    }),
  );
  state.covers = false;
  const code = await run(true);
  expect(code).toBe(1);
  expect(errSpy.mock.calls.flat().join("\n")).toContain("no deprecations.json entry");
});

test("bless: a covered dropped token is allowed and writes the baseline (exit 0)", async () => {
  state.baselineJson = JSON.stringify(
    buildManifest({
      themes: { rebrand: [...currentTokens, tok("--dropped", "#222222")] } as Record<
        Theme,
        Token[]
      >,
      provenance,
    }),
  );
  state.covers = true; // the ledger covers the removal
  const code = await run(true);
  expect(code).toBe(0);
  expect(mkdirSync).toHaveBeenCalled();
  const written = writeFileSync.mock.calls.map(([p]) => String(p));
  expect(written.some((p) => p.endsWith("baseline/manifest.json"))).toBe(true);
  expect(logSpy.mock.calls.flat().join("\n")).toContain("blessed baseline");
});

test("bless: with no existing baseline, bootstraps one (exit 0)", async () => {
  state.existsBaseline = false;
  const code = await run(true);
  expect(code).toBe(0);
  expect(logSpy.mock.calls.flat().join("\n")).toContain("blessed baseline");
});
