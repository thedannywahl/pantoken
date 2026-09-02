import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vite-plus/test";

// check-locale-drift runs its per-locale loop on import, so we drive it through a mocked node:fs and a
// single-locale i18n stub, then assert the console output + process.exitCode. The exported helpers
// (walkMarkdown, apiDrift) are also exercised directly. segment-markdown + translation-memory run for
// real (they're deterministic and fs-free for the surface we touch).
const existsSync = vi.fn<(p: string) => boolean>();
const readFileSync = vi.fn<(p: string) => string>();
const readdirSync = vi.fn<(p: string) => string[]>();
const statSync = vi.fn<(p: string) => { isDirectory: () => boolean }>();
const mkdirSync = vi.fn();
const writeFileSync = vi.fn();
const appendFileSync = vi.fn();

vi.mock("node:fs", () => ({
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  mkdirSync,
  writeFileSync,
  appendFileSync,
}));
// One target locale keeps the loop deterministic. ENGLISH_UI_STRINGS is empty so chromeDrift
// contributes no items to these fixtures; flattenStrings is stubbed rather than pulling in the real
// i18n.ts (which would eagerly load translation-memory caches through this file's mocked node:fs and
// choke on the guide/API markdown fixtures below).
vi.mock("../.vitepress/i18n.ts", () => ({
  NON_ROOT_LOCALES: ["hu"],
  ENGLISH_UI_STRINGS: {},
  flattenStrings: () => [],
}));
// Empty so glossaryDrift contributes no items to these fixtures, same rationale as ENGLISH_UI_STRINGS.
vi.mock("./glossary.ts", () => ({ GLOSSARY_TERMS: [] }));

const GUIDE_MD = "# Guide\n\nA whole guide file, translated as one markdown unit.\n";
const API_MD = [
  "# API: widget",
  "",
  "First paragraph describing the widget in plain prose.",
  "",
  "Second paragraph with more descriptive prose content here.",
  "",
  "Third paragraph continuing the descriptive prose text now.",
  "",
  "Fourth paragraph rounding out the descriptive prose block.",
  "",
].join("\n");

const HOME_MD = [
  "---",
  "layout: home",
  "hero:",
  "  name: pantoken",
  "  text: InstUI, everywhere",
  "---",
].join("\n");

// segment-markdown + translation-memory are deterministic and fs-free for the surface we touch, but
// they must be imported dynamically (after the vi.fn stubs initialize) so the node:fs mock factory
// doesn't run against uninitialized bindings.
let keyFor: (kind: string, source: string) => string;
/** The cached keys that make API_MD fully translated (one per prose block). */
let apiProseKeys: string[];

beforeAll(async () => {
  const { collectUnits, segmentMarkdown } = await import("./segment-markdown.ts");
  ({ keyFor } = await import("./translation-memory.ts"));
  apiProseKeys = collectUnits(segmentMarkdown(API_MD))
    .filter((u) => u.kind === "prose")
    .map((u) => keyFor("prose", u.text));
});

/**
 * The drift policy the script reads through `DriftReporter`. Served from the mocked node:fs so each
 * test controls whether a `hu` finding blocks or only warns — that severity now lives in
 * `i18n-policy.json`, not in this script.
 */
const blockingPolicy = {
  tiers: { source: ["en"], rest: ["*"] },
  surfaces: {
    "docs.guides": { source: "block", rest: "block" },
    "docs.api": { source: "block", rest: "block" },
  },
  fallback: { source: "block", rest: "block" },
};
const advisoryPolicy = {
  tiers: { source: ["en"], rest: ["*"] },
  surfaces: {},
  fallback: { source: "block", rest: "warn" },
};

interface Fixtures {
  guideFiles: string[];
  apiFiles: string[];
  guideMd: string;
  apiMd: string;
  guidesCache: Record<string, string> | null;
  apiCache: Record<string, string> | null;
  apiDirExists: boolean;
  policy: unknown;
  homeMd: string;
  homeCache: Record<string, string> | null;
}
const fixtures: Fixtures = {
  guideFiles: [],
  apiFiles: [],
  guideMd: GUIDE_MD,
  apiMd: API_MD,
  guidesCache: {},
  apiCache: {},
  apiDirExists: true,
  policy: blockingPolicy,
  homeMd: "",
  homeCache: {},
};

/** Resolve whether a mocked path should be treated as existing. */
function fixtureExists(pathName: string): boolean {
  if (pathName.endsWith(".guides.json")) return fixtures.guidesCache !== null;
  if (pathName.endsWith(".api.json")) return fixtures.apiCache !== null;
  if (pathName.endsWith(".home.json")) return fixtures.homeCache !== null;
  if (pathName.endsWith("/api")) return fixtures.apiDirExists;
  return true;
}

/** Mock directory listing lookup based on fixture roots. */
function fixtureDirEntries(pathName: string): string[] {
  if (pathName.endsWith("/guide")) return fixtures.guideFiles;
  if (pathName.endsWith("/api")) return fixtures.apiFiles;
  return [];
}

/** Mock file-content lookup for the drift policy, caches, and markdown files. */
function fixtureFileContents(pathName: string): string {
  if (pathName.endsWith("i18n-policy.json")) return JSON.stringify(fixtures.policy);
  if (pathName.endsWith("/index.md")) return fixtures.homeMd;
  return fixtureCacheFileContents(pathName) ?? fixtureMarkdownContents(pathName);
}

/** Cache payloads keyed by cache filename suffix, or null for non-cache paths. */
function fixtureCacheFileContents(pathName: string): string | null {
  const cache = cacheFixtureFor(pathName);
  if (!cache) return null;
  return JSON.stringify({ entries: cache ?? {} });
}

/** Select cache fixture object for a path or return null for markdown paths. */
function cacheFixtureFor(pathName: string): Record<string, string> | null {
  const cacheBySuffix: [string, Record<string, string> | null][] = [
    [".guides.json", fixtures.guidesCache],
    [".api.json", fixtures.apiCache],
    [".home.json", fixtures.homeCache],
  ];
  for (const [suffix, cache] of cacheBySuffix) {
    if (pathName.endsWith(suffix)) return cache;
  }
  return null;
}

/** Markdown payload fixture for API and guide paths. */
function fixtureMarkdownContents(pathName: string): string {
  return pathName.includes("/api/") ? fixtures.apiMd : fixtures.guideMd;
}

function applyFsMocks(): void {
  existsSync.mockImplementation((p) => fixtureExists(String(p)));
  readdirSync.mockImplementation((p) => fixtureDirEntries(String(p)));
  statSync.mockImplementation(() => ({ isDirectory: () => false }));
  readFileSync.mockImplementation((p) => fixtureFileContents(String(p)));
}

let logSpy: ReturnType<typeof vi.spyOn>;
let warnSpy: ReturnType<typeof vi.spyOn>;
let errSpy: ReturnType<typeof vi.spyOn>;
let savedExit: typeof process.exitCode;

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  Object.assign(fixtures, {
    guideFiles: [],
    apiFiles: [],
    guideMd: GUIDE_MD,
    apiMd: API_MD,
    guidesCache: {},
    apiCache: {},
    apiDirExists: true,
    policy: blockingPolicy,
    homeMd: "",
    homeCache: {},
  });
  applyFsMocks();
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  savedExit = process.exitCode;
  process.exitCode = undefined;
});

afterEach(() => {
  process.exitCode = savedExit;
  vi.restoreAllMocks();
});

const errText = (): string => errSpy.mock.calls.flat().map(String).join("\n");
const logText = (): string => logSpy.mock.calls.flat().map(String).join("\n");

describe("walkMarkdown", () => {
  test("recurses subdirectories and returns only .md files", async () => {
    const tree: Record<string, string[]> = {
      "/r": ["sub", "a.md", "notes.txt"],
      "/r/sub": ["b.md"],
    };
    existsSync.mockImplementation((p) => String(p) in tree);
    readdirSync.mockImplementation((p) => tree[String(p)] ?? []);
    statSync.mockImplementation((p) => ({ isDirectory: () => String(p) === "/r/sub" }));

    const { walkMarkdown } = await import("./check-locale-drift.ts");
    const files = walkMarkdown("/r");
    expect(files).toContain("/r/a.md");
    expect(files).toContain("/r/sub/b.md");
    expect(files.some((f) => f.endsWith(".txt"))).toBe(false);
    expect(files).toHaveLength(2);
  });

  test("returns [] for a missing directory", async () => {
    existsSync.mockReturnValue(false);
    const { walkMarkdown } = await import("./check-locale-drift.ts");
    expect(walkMarkdown("/missing")).toEqual([]);
  });
});

describe("apiDrift", () => {
  test("flags every prose block missing from the cache (skipping the glossary heading)", async () => {
    const { apiDrift } = await import("./check-locale-drift.ts");
    fixtures.apiFiles = ["page.md"];
    fixtures.apiCache = {}; // nothing translated
    const missing = apiDrift("hu");
    expect(missing).toHaveLength(4); // 4 prose blocks; the heading is skipped
    expect(missing.every((m) => m.kind === "prose")).toBe(true);
    expect(missing[0].file).toContain("page.md");
    expect(missing[0].sample.length).toBeGreaterThan(0);
  });

  test("reports no drift when every prose key is cached", async () => {
    const { apiDrift } = await import("./check-locale-drift.ts");
    fixtures.apiFiles = ["page.md"];
    fixtures.apiCache = Object.fromEntries(apiProseKeys.map((k) => [k, "t"]));
    expect(apiDrift("hu")).toEqual([]);
  });

  test("treats an absent cache file as an empty cache", async () => {
    const { apiDrift } = await import("./check-locale-drift.ts");
    fixtures.apiFiles = ["page.md"];
    fixtures.apiCache = null; // existsSync(cache) → false
    expect(apiDrift("hu")).toHaveLength(4);
  });
});

describe("top-level drift check", () => {
  test("logs success and exits 0 when everything is cached", async () => {
    fixtures.guideFiles = ["intro.md"];
    fixtures.apiFiles = ["page.md"];
    fixtures.guidesCache = { [keyFor("markdown", GUIDE_MD)]: "t" };
    fixtures.apiCache = Object.fromEntries(apiProseKeys.map((k) => [k, "t"]));

    await import("./check-locale-drift.ts");

    expect(logText()).toContain("no translation drift");
    expect(process.exitCode).toBe(0);
  });

  test("exits 1 when the policy blocks the drifted surfaces", async () => {
    fixtures.guideFiles = ["intro.md"];
    fixtures.apiFiles = ["page.md"];
    fixtures.guidesCache = {}; // guide drifts
    fixtures.apiCache = {}; // all 4 api prose blocks drift

    await import("./check-locale-drift.ts");

    const out = errText();
    expect(out).toContain("blocking drift finding(s)");
    expect(out).toContain("[docs.guides]");
    expect(out).toContain("[docs.api]");
    expect(out).toContain("Run `vp run docs:locales:translate`");
    expect(process.exitCode).toBe(1);
  });

  test("reports the same drift as advisory and exits 0 when the policy only warns", async () => {
    fixtures.policy = advisoryPolicy;
    fixtures.guideFiles = ["intro.md"];
    fixtures.apiFiles = ["page.md"];
    fixtures.guidesCache = {};
    fixtures.apiCache = {};

    await import("./check-locale-drift.ts");

    const warned = warnSpy.mock.calls.flat().map(String).join("\n");
    expect(warned).toContain("advisory drift finding(s)");
    expect(warned).toContain("[docs.api]");
    expect(warned).toContain("not blocking this merge");
    expect(errText()).not.toContain("blocking drift finding(s)");
    expect(process.exitCode).toBe(0);
  });

  test("I18N_DRIFT_STRICT escalates an advisory policy back to blocking", async () => {
    vi.stubEnv("I18N_DRIFT_STRICT", "1");
    fixtures.policy = advisoryPolicy;
    fixtures.guideFiles = ["intro.md"];
    fixtures.apiFiles = ["page.md"];
    fixtures.guidesCache = {};
    fixtures.apiCache = {};

    await import("./check-locale-drift.ts");

    expect(errText()).toContain("blocking drift finding(s)");
    expect(process.exitCode).toBe(1);
    vi.unstubAllEnvs();
  });

  test("caps the per-file sample list at three", async () => {
    fixtures.apiFiles = ["page.md"];
    fixtures.apiCache = {}; // all 4 api prose blocks drift, one file

    await import("./check-locale-drift.ts");

    // 4 findings collapse into one `page.md` row, of which only 3 samples print.
    const samples = errText()
      .split("\n")
      .filter((line) => line.trimStart().startsWith("- [prose]"));
    expect(samples).toHaveLength(3);
  });

  test("flags an uncached home-page frontmatter value under docs.home", async () => {
    fixtures.homeMd = HOME_MD;
    fixtures.homeCache = {}; // nothing translated

    await import("./check-locale-drift.ts");

    const out = errText();
    expect(out).toContain("[docs.home]");
    expect(out).toContain("docs/index.md");
    expect(out).toContain("InstUI, everywhere");
    expect(process.exitCode).toBe(1);
  });

  test("reports no docs.home drift when the frontmatter value is cached", async () => {
    fixtures.homeMd = HOME_MD;
    fixtures.homeCache = { [keyFor("text", "InstUI, everywhere")]: "t" };

    await import("./check-locale-drift.ts");

    expect(errText()).not.toContain("[docs.home]");
    expect(process.exitCode).toBe(0);
  });

  test("skips API drift with a warning when docs/api is not generated", async () => {
    fixtures.apiDirExists = false;
    fixtures.guideFiles = ["intro.md"];
    fixtures.guidesCache = { [keyFor("markdown", GUIDE_MD)]: "t" }; // guides clean

    await import("./check-locale-drift.ts");

    expect(warnSpy.mock.calls.flat().map(String).join("\n")).toContain("docs/api not generated");
    expect(process.exitCode).toBe(0);
  });
});
