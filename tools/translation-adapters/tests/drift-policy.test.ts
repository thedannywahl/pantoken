import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

const {
  DEFAULT_DRIFT_POLICY,
  DriftReporter,
  loadDriftPolicy,
  parseDriftPolicy,
  resetDriftPolicyCache,
  resolveDriftSeverity,
  resolveTier,
} = await import("../src/drift-policy.ts");

type Policy = Parameters<typeof resolveDriftSeverity>[0];

const POLICY: Policy = {
  tiers: {
    source: ["en"],
    primary: ["en-*", "de", "es"],
    rest: ["*"],
  },
  fallback: { source: "block", rest: "warn" },
  surfaces: {
    "ui.strings": { source: "block", primary: "warn", rest: "warn" },
    "docs.guides": { source: "block", primary: "block", rest: "off" },
    "docs.parity": "block",
    "docs.demos": { source: "block" },
  },
};

// ── resolveTier ───────────────────────────────────────────────────────────────

test("resolveTier matches an exact locale tag", () => {
  expect(resolveTier(POLICY, "en")).toBe("source");
});

test("resolveTier matches a prefix glob", () => {
  expect(resolveTier(POLICY, "en-GB")).toBe("primary");
});

test("resolveTier honors declaration order, so a specific tier beats the catch-all", () => {
  expect(resolveTier(POLICY, "de")).toBe("primary");
  expect(resolveTier(POLICY, "hu")).toBe("rest");
});

test("resolveTier returns undefined when no tier matches", () => {
  expect(resolveTier({ tiers: { source: ["en"] }, surfaces: {} }, "hu")).toBeUndefined();
});

// ── resolveDriftSeverity ──────────────────────────────────────────────────────

test("resolveDriftSeverity reads the matched tier's severity", () => {
  expect(resolveDriftSeverity(POLICY, "ui.strings", "en")).toBe("block");
  expect(resolveDriftSeverity(POLICY, "ui.strings", "hu")).toBe("warn");
  expect(resolveDriftSeverity(POLICY, "docs.guides", "es")).toBe("block");
  expect(resolveDriftSeverity(POLICY, "docs.guides", "hu")).toBe("off");
});

test("resolveDriftSeverity applies a bare severity to every locale", () => {
  expect(resolveDriftSeverity(POLICY, "docs.parity", "en")).toBe("block");
  expect(resolveDriftSeverity(POLICY, "docs.parity", "mi")).toBe("block");
});

test("resolveDriftSeverity falls back for a tier the surface doesn't name", () => {
  expect(resolveDriftSeverity(POLICY, "docs.demos", "hu")).toBe("warn");
});

test("resolveDriftSeverity falls back for an unknown surface rather than blocking", () => {
  expect(resolveDriftSeverity(POLICY, "typo.surface", "hu")).toBe("warn");
});

test("resolveDriftSeverity reads a tier-aware fallback, so a new surface still gates English", () => {
  expect(resolveDriftSeverity(POLICY, "brand.new.surface", "en")).toBe("block");
  expect(resolveDriftSeverity(POLICY, "brand.new.surface", "hu")).toBe("warn");
});

test("resolveDriftSeverity defaults to warn when the policy omits a fallback", () => {
  expect(resolveDriftSeverity({ tiers: {}, surfaces: {} }, "anything", "hu")).toBe("warn");
});

test("the built-in default policy blocks English source drift and warns on translations", () => {
  expect(resolveDriftSeverity(DEFAULT_DRIFT_POLICY, "ui.strings", "en")).toBe("block");
  expect(resolveDriftSeverity(DEFAULT_DRIFT_POLICY, "ui.strings", "hu")).toBe("warn");
});

// ── parseDriftPolicy ──────────────────────────────────────────────────────────

test("parseDriftPolicy accepts the committed repo policy", () => {
  const raw = JSON.parse(
    readFileSync(join(import.meta.dirname, "../../../i18n-policy.json"), "utf8"),
  );
  expect(() => parseDriftPolicy(raw)).not.toThrow();
});

test("parseDriftPolicy rejects an unknown severity", () => {
  expect(() =>
    parseDriftPolicy({ tiers: { rest: ["*"] }, surfaces: { "a.b": "explode" } }),
  ).toThrow(/surfaces\.a\.b must be one of/);
});

test("parseDriftPolicy rejects a surface naming a tier that doesn't exist", () => {
  expect(() =>
    parseDriftPolicy({ tiers: { rest: ["*"] }, surfaces: { "a.b": { primary: "block" } } }),
  ).toThrow(/unknown tier "primary"/);
});

test("parseDriftPolicy rejects non-string locale patterns", () => {
  expect(() => parseDriftPolicy({ tiers: { rest: [1] }, surfaces: {} })).toThrow(
    /tiers\.rest must be an array/,
  );
});

test("parseDriftPolicy rejects a missing surfaces block", () => {
  expect(() => parseDriftPolicy({ tiers: {} })).toThrow(/`surfaces` must be an object/);
});

// ── loadDriftPolicy ───────────────────────────────────────────────────────────

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "drift-policy-"));
  resetDriftPolicyCache();
  delete process.env.I18N_DRIFT_POLICY;
  delete process.env.I18N_DRIFT_STRICT;
  delete process.env.GITHUB_ACTIONS;
  delete process.env.GITHUB_STEP_SUMMARY;
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
  resetDriftPolicyCache();
  delete process.env.I18N_DRIFT_POLICY;
  delete process.env.I18N_DRIFT_STRICT;
  delete process.env.GITHUB_ACTIONS;
  delete process.env.GITHUB_STEP_SUMMARY;
  vi.restoreAllMocks();
});

test("loadDriftPolicy reads i18n-policy.json from the workspace root", () => {
  writeFileSync(join(dir, "pnpm-workspace.yaml"), "packages: []\n");
  writeFileSync(
    join(dir, "i18n-policy.json"),
    JSON.stringify({ tiers: { rest: ["*"] }, surfaces: { "x.y": "off" } }),
  );
  const nested = join(dir, "a", "b");
  mkdirSync(nested, { recursive: true });
  expect(loadDriftPolicy(nested).surfaces["x.y"]).toBe("off");
});

test("loadDriftPolicy falls back to the built-in policy when no file exists", () => {
  writeFileSync(join(dir, "pnpm-workspace.yaml"), "packages: []\n");
  expect(loadDriftPolicy(dir)).toBe(DEFAULT_DRIFT_POLICY);
});

test("loadDriftPolicy throws when I18N_DRIFT_POLICY points at a missing file", () => {
  process.env.I18N_DRIFT_POLICY = join(dir, "nope.json");
  expect(() => loadDriftPolicy(dir)).toThrow(/points at a missing file/);
});

// ── DriftReporter ─────────────────────────────────────────────────────────────

const silence = () => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
};

const reporterFor = (policy: Policy) =>
  new DriftReporter({ label: "test", fixCommand: "vp run fix", policy });

test("DriftReporter exits 0 with no findings", () => {
  silence();
  expect(reporterFor(POLICY).report()).toBe(0);
});

test("DriftReporter exits 1 when any finding blocks", () => {
  silence();
  const reporter = reporterFor(POLICY);
  reporter.add({ surface: "ui.strings", locale: "en", file: "a.json", detail: "x" });
  expect(reporter.blocking).toBe(true);
  expect(reporter.report()).toBe(1);
});

test("DriftReporter exits 0 when every finding only warns", () => {
  silence();
  const reporter = reporterFor(POLICY);
  reporter.addAll([
    { surface: "ui.strings", locale: "hu", file: "hu.json", detail: "x" },
    { surface: "ui.strings", locale: "mi", file: "mi.json", detail: "y" },
  ]);
  expect(reporter.blocking).toBe(false);
  expect(reporter.report()).toBe(0);
});

test("DriftReporter drops findings a surface turned off", () => {
  silence();
  const reporter = reporterFor(POLICY);
  reporter.add({ surface: "docs.guides", locale: "hu", file: "hu/guide/a.md", detail: "x" });
  expect(reporter.blocking).toBe(false);
  expect(reporter.report()).toBe(0);
});

test("I18N_DRIFT_STRICT escalates warnings to blocking", () => {
  silence();
  process.env.I18N_DRIFT_STRICT = "1";
  const reporter = reporterFor(POLICY);
  reporter.add({ surface: "ui.strings", locale: "hu", file: "hu.json", detail: "x" });
  expect(reporter.report()).toBe(1);
});

test("I18N_DRIFT_STRICT does not resurrect findings a surface turned off", () => {
  silence();
  process.env.I18N_DRIFT_STRICT = "1";
  const reporter = reporterFor(POLICY);
  reporter.add({ surface: "docs.guides", locale: "hu", file: "hu/guide/a.md", detail: "x" });
  expect(reporter.report()).toBe(0);
});

test("DriftReporter emits GitHub annotations capped at 10, then a rollup notice", () => {
  const logged: string[] = [];
  vi.spyOn(console, "log").mockImplementation((line) => void logged.push(String(line)));
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  process.env.GITHUB_ACTIONS = "true";

  const reporter = reporterFor(POLICY);
  for (let i = 0; i < 14; i += 1) {
    reporter.add({ surface: "ui.strings", locale: "hu", file: `f${i}.json`, detail: "x" });
  }
  reporter.report();

  const annotations = logged.filter((line) => line.startsWith("::warning"));
  expect(annotations).toHaveLength(10);
  expect(annotations[0]).toContain("file=f0.json,line=1");
  expect(annotations[0]).toContain("vp run fix");
  expect(logged.filter((line) => line.startsWith("::notice"))).toHaveLength(1);
});

test("DriftReporter annotates blocking findings as errors and groups locales per file", () => {
  const logged: string[] = [];
  vi.spyOn(console, "log").mockImplementation((line) => void logged.push(String(line)));
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  process.env.GITHUB_ACTIONS = "true";

  const reporter = reporterFor(POLICY);
  reporter.addAll([
    { surface: "docs.parity", locale: "de", file: "docs/de/api", detail: "missing page" },
    { surface: "docs.parity", locale: "hu", file: "docs/de/api", detail: "missing page" },
  ]);
  reporter.report();

  const errors = logged.filter((line) => line.startsWith("::error"));
  expect(errors).toHaveLength(1);
  expect(errors[0]).toContain("2 untranslated/drifted unit(s) across 2 locale(s)");
});

test("DriftReporter leads with a per-surface rollup so a small surface is not buried", () => {
  const errored: string[] = [];
  const warned: string[] = [];
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation((line) => void errored.push(String(line)));
  vi.spyOn(console, "warn").mockImplementation((line) => void warned.push(String(line)));

  const reporter = reporterFor(POLICY);
  // One huge surface and one tiny one — the tiny one falls outside the capped file list.
  for (let i = 0; i < 40; i += 1) {
    reporter.add({ surface: "ui.strings", locale: "hu", file: `big${i}.json`, detail: "x" });
  }
  reporter.add({ surface: "docs.demos", locale: "mi", file: "small.json", detail: "y" });
  reporter.report();

  const out = [...errored, ...warned].join("\n");
  expect(out).toContain("translation drift by surface:");
  expect(out).toContain("ui.strings: 40 unit(s) in 40 file(s), 1 locale(s) — advisory");
  expect(out).toContain("docs.demos: 1 unit(s) in 1 file(s), 1 locale(s) — advisory");
  // The file list caps at 20 rows per severity, so `small.json` only survives via the rollup.
  expect(out).toContain("…and 21 more file(s).");
});

test("the rollup marks a blocking surface as blocking and routes to stderr", () => {
  const errored: string[] = [];
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation((line) => void errored.push(String(line)));

  const reporter = reporterFor(POLICY);
  reporter.add({ surface: "ui.strings", locale: "en", file: "en.json", detail: "x" });
  reporter.add({ surface: "ui.strings", locale: "hu", file: "hu.json", detail: "y" });
  reporter.report();

  const out = errored.join("\n");
  expect(out).toContain("ui.strings: 1 unit(s) in 1 file(s), 1 locale(s) — blocks");
  expect(out).toContain("ui.strings: 1 unit(s) in 1 file(s), 1 locale(s) — advisory");
});

test("DriftReporter writes a markdown table to the job summary", () => {
  silence();
  const summary = join(dir, "summary.md");
  writeFileSync(summary, "");
  process.env.GITHUB_STEP_SUMMARY = summary;

  const reporter = reporterFor(POLICY);
  reporter.addAll([
    { surface: "ui.strings", locale: "en", file: "en.json", detail: "x" },
    { surface: "ui.strings", locale: "hu", file: "hu.json", detail: "y" },
  ]);
  reporter.report();

  const written = readFileSync(summary, "utf8");
  expect(written).toContain("### Translation drift — test");
  expect(written).toContain("**1** blocking · **1** advisory");
  expect(written).toContain("| 🚫 blocks | `ui.strings` | 1 | 1 | 1 |");
  expect(written).toContain("| ⚠️ advisory | `ui.strings` | 1 | 1 | 1 |");
  expect(written).toContain("<details><summary>Drifted files</summary>");
  expect(written).toContain("`en.json`");
});

test("DriftReporter skips the summary when GITHUB_STEP_SUMMARY is unset", () => {
  silence();
  const reporter = reporterFor(POLICY);
  reporter.add({ surface: "ui.strings", locale: "hu", file: "hu.json", detail: "x" });
  expect(() => reporter.report()).not.toThrow();
});
