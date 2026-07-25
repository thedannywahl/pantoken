import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

// This module runs its build (read ledger → buildTokens → write JSON) at import time. Mock every
// filesystem, module-resolution, and heavy upstream dependency so importing it is a harmless no-op and
// the pure provenance helpers (`catalogRef`, `lockCommit`, `resolvedVersion`) can be tested in isolation.
const readFileSync = vi.fn<(...args: unknown[]) => string>();
const writeFileSync = vi.fn();
const mkdirSync = vi.fn();
const existsSync = vi.fn<(...args: unknown[]) => boolean>();
const requireResolve = vi.fn<(...args: unknown[]) => string>();

vi.mock("node:fs", () => ({ readFileSync, writeFileSync, mkdirSync, existsSync }));
vi.mock("node:module", () => ({ createRequire: () => ({ resolve: requireResolve }) }));
vi.mock("@pantoken/core", () => ({ buildTokens: () => [], defineToken: (t: unknown) => t }));
vi.mock("@instructure/instructure-design-tokens", () => ({ themeTokens: {} }));
vi.mock("@pantoken/plugin-deprecations", () => ({ deprecationShims: () => ({}) }));

const MODULE_PATH = new URL("./generate.ts", import.meta.url).pathname;

type Generate = typeof import("./generate.ts");
let mod: Generate;

beforeEach(async () => {
  vi.resetModules();
  vi.clearAllMocks();
  // Safe import-time defaults: ledger parses, everything else no-ops.
  readFileSync.mockReturnValue("[]");
  existsSync.mockReturnValue(false);
  requireResolve.mockImplementation((id: unknown) => `/node_modules/${String(id)}`);
  vi.spyOn(console, "log").mockImplementation(() => {});
  mod = await import(MODULE_PATH);
});

afterEach(() => {
  vi.restoreAllMocks();
});

// --- catalogRef ------------------------------------------------------------

test("catalogRef returns the pinned ref from a quoted-key workspace line", () => {
  readFileSync.mockReturnValue(
    ["catalog:", '  "@instructure/instructure-design-tokens": github:org/repo#v1.5.0', ""].join(
      "\n",
    ),
  );

  expect(mod.catalogRef("@instructure/instructure-design-tokens")).toBe("v1.5.0");
});

test("catalogRef matches a `pkg:` prefixed line and strips surrounding quotes", () => {
  readFileSync.mockReturnValue(["overrides:", '  some/pkg: github:org/repo#"v2.0.0"'].join("\n"));

  expect(mod.catalogRef("some/pkg")).toBe("v2.0.0");
});

test("catalogRef returns `unpinned` when the line has no `#ref`", () => {
  readFileSync.mockReturnValue('  "@scope/pkg": ^1.0.0\n');

  expect(mod.catalogRef("@scope/pkg")).toBe("unpinned");
});

test("catalogRef returns `unpinned` when the package is absent", () => {
  readFileSync.mockReturnValue('  "@scope/other": github:org/repo#v9\n');

  expect(mod.catalogRef("@scope/missing")).toBe("unpinned");
});

test("catalogRef swallows a read error and returns `unpinned`", () => {
  readFileSync.mockImplementation(() => {
    throw new Error("ENOENT");
  });

  expect(mod.catalogRef("@scope/pkg")).toBe("unpinned");
});

// --- lockCommit ------------------------------------------------------------

test("lockCommit extracts the sha from a tarball URL in the lockfile", () => {
  readFileSync.mockReturnValue(
    "  resolution: {tarball: https://codeload.github.com/org/instructure-design-tokens/tar.gz/abc1234def5678}\n",
  );

  expect(mod.lockCommit("instructure-design-tokens")).toBe("abc1234def5678");
});

test("lockCommit returns `unknown` when no tarball URL matches", () => {
  readFileSync.mockReturnValue("  resolution: {integrity: sha512-...}\n");

  expect(mod.lockCommit("instructure-design-tokens")).toBe("unknown");
});

test("lockCommit swallows a read error and returns `unknown`", () => {
  readFileSync.mockImplementation(() => {
    throw new Error("ENOENT");
  });

  expect(mod.lockCommit("instructure-design-tokens")).toBe("unknown");
});

// --- resolvedVersion -------------------------------------------------------

test("resolvedVersion reads the version from a resolvable `<pkg>/package.json`", () => {
  requireResolve.mockImplementation((id: unknown) => {
    if (id === "@scope/pkg/package.json") return "/nm/@scope/pkg/package.json";
    throw new Error("unexpected");
  });
  readFileSync.mockImplementation((p: unknown) => {
    if (String(p) === "/nm/@scope/pkg/package.json") return JSON.stringify({ version: "8.2.0" });
    return "[]";
  });

  expect(mod.resolvedVersion("@scope/pkg")).toBe("8.2.0");
});

test("resolvedVersion returns `unknown` when the resolved package.json has no version", () => {
  requireResolve.mockImplementation((id: unknown) => {
    if (id === "@scope/pkg/package.json") return "/nm/@scope/pkg/package.json";
    throw new Error("unexpected");
  });
  readFileSync.mockImplementation((p: unknown) => {
    if (String(p) === "/nm/@scope/pkg/package.json") return JSON.stringify({ name: "@scope/pkg" });
    return "[]";
  });

  expect(mod.resolvedVersion("@scope/pkg")).toBe("unknown");
});

test("resolvedVersion walks up from the entry when `./package.json` isn't exported", () => {
  // First strategy (`<pkg>/package.json`) throws; fall back to resolving the entry and walking up.
  requireResolve.mockImplementation((id: unknown) => {
    if (id === "@scope/pkg/package.json") throw new Error("no exports entry");
    if (id === "@scope/pkg") return "/nm/@scope/pkg/dist/index.js";
    throw new Error("unexpected");
  });
  existsSync.mockImplementation((p: unknown) => String(p) === "/nm/@scope/pkg/package.json");
  readFileSync.mockImplementation((p: unknown) => {
    if (String(p) === "/nm/@scope/pkg/package.json")
      return JSON.stringify({ name: "@scope/pkg", version: "9.9.9" });
    return "[]";
  });

  expect(mod.resolvedVersion("@scope/pkg")).toBe("9.9.9");
});

test("resolvedVersion keeps walking past a package.json whose name doesn't match", () => {
  requireResolve.mockImplementation((id: unknown) => {
    if (id === "@scope/pkg/package.json") throw new Error("no exports entry");
    if (id === "@scope/pkg") return "/nm/@scope/pkg/dist/index.js";
    throw new Error("unexpected");
  });
  // A package.json exists at the dist level but belongs to a different name → skip, keep walking,
  // never find a matching one → `unknown`.
  existsSync.mockImplementation((p: unknown) => String(p) === "/nm/@scope/pkg/dist/package.json");
  readFileSync.mockImplementation((p: unknown) => {
    if (String(p) === "/nm/@scope/pkg/dist/package.json")
      return JSON.stringify({ name: "other", version: "0.0.1" });
    return "[]";
  });

  expect(mod.resolvedVersion("@scope/pkg")).toBe("unknown");
});

test("resolvedVersion returns `unknown` when nothing resolves at all", () => {
  requireResolve.mockImplementation(() => {
    throw new Error("cannot resolve");
  });

  expect(mod.resolvedVersion("@scope/pkg")).toBe("unknown");
});
