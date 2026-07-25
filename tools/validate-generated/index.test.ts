import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

/**
 * `index.ts` is a top-level validation script: importing it runs every check and calls `process.exit`
 * on failure. These tests mock the filesystem, the CLI spawn, and the token/reference helpers, then
 * re-import the module under different mock states to drive both the all-pass and the failure paths.
 * Real `./match-wildcard.ts` runs underneath.
 */

const state = vi.hoisted(() => ({
  exists: true,
  execThrows: false,
  dangling: [] as string[],
  unknown: [] as string[],
  manifestMode: "ok" as "ok" | "bypass" | "none",
  componentSource: "/** cssdoc */\n.x{}",
  componentFinal: ".x{}",
}));

const dirent = (name: string, isDir: boolean) => ({ name, isDirectory: () => isDir });

const manifestJson = (): string => {
  switch (state.manifestMode) {
    case "bypass":
      return JSON.stringify({ exports: { "./bad.css": "./src/bad.css" } });
    case "none":
      return JSON.stringify({ exports: { "./x.js": "./dist/x.js" } });
    default:
      return JSON.stringify({
        exports: { "./a.css": "./dist/a.css", "./all.css": "./dist/*.css" },
      });
  }
};

vi.mock("node:fs", () => ({
  existsSync: () => state.exists,
  mkdtempSync: () => "/tmp/pantoken-validate-xyz",
  readdirSync: (dir: string) =>
    String(dir).includes("/__sub")
      ? [dirent("leaf.css", false)]
      : [dirent("__sub", true), dirent("gen.css", false)],
  readFileSync: (path: string, enc?: string) => {
    const p = String(path);
    if (p.endsWith("package.json")) return manifestJson();
    if (enc === "utf8") {
      if (p.endsWith("generated/components.css")) return state.componentSource;
      if (p.endsWith("dist/components.css")) return state.componentFinal;
      return ":root{--instui-x:1}";
    }
    return Buffer.from("data");
  },
}));

vi.mock("node:child_process", () => ({
  execFileSync: () => {
    if (state.execThrows) throw new Error("cli failed");
    return Buffer.from("");
  },
}));

vi.mock(import("node:os"), () => ({ tmpdir: () => "/tmp" }));
vi.mock("@pantoken/tokens", () => ({ tokens: {} }));
vi.mock(import("@pantoken/utils"), () => ({
  danglingReferences: () => state.dangling,
  unknownReferences: () => state.unknown,
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
  state.exists = true;
  state.execThrows = false;
  state.dangling = [];
  state.unknown = [];
  state.manifestMode = "ok";
  state.componentSource = "/** cssdoc */\n.x{}";
  state.componentFinal = ".x{}";
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
});

async function run(): Promise<number | undefined> {
  vi.resetModules();
  try {
    await import("./index.ts");
    return undefined;
  } catch (error) {
    if (error instanceof ExitError) return error.code;
    throw error;
  }
}

test("all checks pass: no exit, success line printed", async () => {
  const code = await run();
  expect(code).toBeUndefined();
  expect(logSpy.mock.calls.flat().join("\n")).toContain("all checks passed");
  expect(errSpy).not.toHaveBeenCalled();
});

test("failures across every check exit 1", async () => {
  state.exists = false; // generated dirs empty + finalized CSS missing
  state.execThrows = true; // every CLI target throws
  state.dangling = ["--instui-missing"]; // self-contained sheets dangle
  state.unknown = ["--instui-unknown"]; // bridges reference unknown tokens
  state.componentSource = ".x{}"; // lost cssdoc comments
  state.componentFinal = "/** kept */\n.x{}"; // finalized retained comments

  const code = await run();
  expect(code).toBe(1);
  const errors = errSpy.mock.calls.flat().join("\n");
  expect(errors).toContain("generated/ is missing or empty");
  expect(errors).toContain("lost cssdoc comments");
  expect(errors).toContain("finalized CSS retained cssdoc comments");
  expect(errors).toContain("dangling var() refs");
  expect(errors).toContain("references unknown tokens");
  expect(errors).toContain("failure(s)");
});

test("a CSS export that bypasses dist exits 1", async () => {
  state.manifestMode = "bypass";
  const code = await run();
  expect(code).toBe(1);
  expect(errSpy.mock.calls.flat().join("\n")).toContain("bypasses finalized dist CSS");
});

test("a package with no CSS exports exits 1", async () => {
  state.manifestMode = "none";
  const code = await run();
  expect(code).toBe(1);
  expect(errSpy.mock.calls.flat().join("\n")).toContain("no CSS exports found");
});
