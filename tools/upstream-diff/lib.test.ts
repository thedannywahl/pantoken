import { expect, test } from "vite-plus/test";
import {
  buildManifest,
  categoryOf,
  diffManifests,
  manifestsEqual,
  serializeManifest,
  toJsonReport,
  toMarkdownReport,
  type Manifest,
} from "./lib.ts";
import type { Provenance } from "@pantoken/tokens/meta";
import type { Theme, Token } from "@pantoken/tokens";

const prov = (ref: string, icons: string): Provenance => ({
  designTokens: { package: "@instructure/instructure-design-tokens", ref, commit: "abcdef0" },
  uiIcons: { package: "@instructure/ui-icons", resolved: icons },
});

const tok = (name: string, value: string, extra: Partial<Token> = {}): Token => ({
  name,
  syntax: value.startsWith("#") ? "<color>" : value.includes("var(") ? "*" : "<length>",
  inherits: true,
  value,
  ...extra,
});

const icon = (name: string, value: string, meta: Token["meta"] = {}): Token => ({
  name,
  syntax: "<image>",
  inherits: false,
  value,
  meta: { kind: "icon", ...meta },
});

function manifest(ref: string, tokens: Token[]): Manifest {
  return buildManifest({
    themes: { rebrand: tokens, canvas: tokens, canvasHighContrast: tokens },
    provenance: prov(ref, "11.7.3"),
  });
}

test("categoryOf routes syntax to a value family", () => {
  expect(categoryOf("<color>")).toBe("color");
  expect(categoryOf("<length>")).toBe("length");
  expect(categoryOf("<integer>")).toBe("number");
  expect(categoryOf("<image>")).toBe("image");
  expect(categoryOf("*")).toBe("other");
});

test("buildManifest stores icons once (theme-independent) and tokens per theme", () => {
  const m = manifest("v1.4.0", [
    tok("--instui-color-x", "#0374B5"),
    icon("--instui-icon-star", "data:image/svg+xml,STAR"),
  ]);
  expect(Object.keys(m.icons)).toEqual(["--instui-icon-star"]);
  expect(m.themes.rebrand["--instui-color-x"].value).toBe("#0374B5");
  // The icon's fat value is stored as a hash, not verbatim.
  expect(m.icons["--instui-icon-star"].hash).not.toContain("data:");
});

test("diff classifies added, removed, value, and ref changes", () => {
  const before = manifest("v1.4.0", [
    tok("--instui-color-keep", "#111111"),
    tok("--instui-color-gone", "#222222"),
    tok("--instui-ref", "var(--instui-color-a)", { syntax: "*", refersTo: "--instui-color-a" }),
  ]);
  const after = manifest("v1.5.0", [
    tok("--instui-color-keep", "#999999"),
    tok("--instui-color-new", "#333333"),
    tok("--instui-ref", "var(--instui-color-b)", { syntax: "*", refersTo: "--instui-color-b" }),
  ]);
  const diff = diffManifests(before, after);
  expect(diff.buckets.addedTokens.map((c) => c.name)).toContain("--instui-color-new");
  expect(diff.buckets.removedTokens.map((c) => c.name)).toContain("--instui-color-gone");
  // The value change appears per theme (3), coloured.
  const valueNames = diff.buckets.valueChanges.filter((c) => c.name === "--instui-color-keep");
  expect(valueNames.length).toBe(3);
  expect(valueNames[0].category).toBe("color");
  expect(diff.buckets.refChanges[0].name).toBe("--instui-ref");
  // Removed tokens land in the manual-review subset.
  expect(diff.manualReview.some((c) => c.name === "--instui-color-gone")).toBe(true);
});

test("diff detects an icon rename by matching artwork hash", () => {
  const before = manifest("v1.4.0", [icon("--instui-icon-old-name", "data:image/svg+xml,ART")]);
  const after = manifest("v1.5.0", [icon("--instui-icon-new-name", "data:image/svg+xml,ART")]);
  const diff = diffManifests(before, after);
  expect(diff.buckets.renamedIcons).toEqual([
    { name: "--instui-icon-old-name", kind: "icon-renamed", renamedTo: "--instui-icon-new-name" },
  ]);
  expect(diff.buckets.removedIcons).toEqual([]);
  expect(diff.buckets.addedIcons).toEqual([]);
});

test("identical builds produce no drift and compare equal", () => {
  const a = manifest("v1.4.0", [tok("--instui-color-x", "#0374B5")]);
  const b = manifest("v1.4.0", [tok("--instui-color-x", "#0374B5")]);
  expect(manifestsEqual(a, b)).toBe(true);
  expect(diffManifests(a, b).summary.total).toBe(0);
});

/** A single-theme manifest, so change counts aren't multiplied across the three themes. */
function oneTheme(ref: string, tokens: Token[]): Manifest {
  return buildManifest({
    themes: { rebrand: tokens } as Record<Theme, Token[]>,
    provenance: prov(ref, "11.7.3"),
  });
}

test("tokenEntryOf records themed, refersTo, and deprecated flags when present", () => {
  const m = oneTheme("v1", [
    tok("--a", "var(--b)", {
      syntax: "*",
      themed: true,
      refersTo: "--b",
      meta: { deprecated: { note: "deprecated" } },
    }),
    tok("--plain", "#111111"),
  ]);
  expect(m.themes.rebrand["--a"]).toMatchObject({
    themed: true,
    refersTo: "--b",
    deprecated: true,
  });
  // A plain token omits the optional flags entirely.
  expect(m.themes.rebrand["--plain"].themed).toBeUndefined();
  expect(m.themes.rebrand["--plain"].deprecated).toBeUndefined();
});

test("iconEntryOf keeps theme-independent metadata plus a content hash", () => {
  const m = oneTheme("v1", [
    icon("--icon-full", "data:image/svg+xml,ART", {
      source: "custom",
      style: "Line",
      viewBox: "0 0 1920 1920",
      bidirectional: true,
    }),
    icon("--icon-bare", "data:image/svg+xml,BARE"),
  ]);
  expect(m.icons["--icon-full"]).toMatchObject({
    source: "custom",
    style: "Line",
    viewBox: "0 0 1920 1920",
    bidirectional: true,
  });
  expect(m.icons["--icon-full"].hash).toHaveLength(16);
  // A bare icon omits every optional field but still hashes.
  expect(m.icons["--icon-bare"].source).toBeUndefined();
  expect(m.icons["--icon-bare"].hash).toHaveLength(16);
});

test("value-change category falls back to the value when syntax is '*'", () => {
  const before = oneTheme("v1", [
    tok("--len", "1rem", { syntax: "*" }),
    tok("--col", "light-dark(#fff, #000)", { syntax: "*" }),
    tok("--misc", "auto", { syntax: "*" }),
  ]);
  const after = oneTheme("v2", [
    tok("--len", "2rem", { syntax: "*" }),
    tok("--col", "light-dark(#111, #eee)", { syntax: "*" }),
    tok("--misc", "manual", { syntax: "*" }),
  ]);
  const cats = Object.fromEntries(
    diffManifests(before, after).buckets.valueChanges.map((c) => [c.name, c.category]),
  );
  expect(cats["--len"]).toBe("length");
  expect(cats["--col"]).toBe("color");
  expect(cats["--misc"]).toBe("other");
});

test("syntax and inherits changes both land in the syntax bucket", () => {
  const before = oneTheme("v1", [
    tok("--syn", "1px", { syntax: "<length>", inherits: true }),
    tok("--inh", "1px", { syntax: "<length>", inherits: true }),
  ]);
  const after = oneTheme("v2", [
    tok("--syn", "1px", { syntax: "<color>", inherits: true }),
    tok("--inh", "1px", { syntax: "<length>", inherits: false }),
  ]);
  const diff = diffManifests(before, after);
  expect(diff.buckets.syntaxChanges.map((c) => c.name).sort()).toEqual(["--inh", "--syn"]);
  // A syntax flip with no value change produces no value-change entry.
  expect(diff.buckets.valueChanges).toEqual([]);
});

test("diffIcons reports a changed icon (same name, new artwork)", () => {
  const before = oneTheme("v1", [icon("--icon-x", "data:image/svg+xml,OLD")]);
  const after = oneTheme("v2", [icon("--icon-x", "data:image/svg+xml,NEW")]);
  const diff = diffManifests(before, after);
  expect(diff.buckets.changedIcons.map((c) => c.name)).toEqual(["--icon-x"]);
  expect(diff.buckets.changedIcons[0].kind).toBe("icon-changed");
});

test("a duplicated-artwork rename consumes the add only once; the rest are removals", () => {
  // Two removed icons share one artwork; a single added icon claims it as a rename, the other is removed.
  const before = oneTheme("v1", [
    icon("--icon-a", "data:image/svg+xml,SAME"),
    icon("--icon-b", "data:image/svg+xml,SAME"),
  ]);
  const after = oneTheme("v2", [icon("--icon-c", "data:image/svg+xml,SAME")]);
  const diff = diffManifests(before, after);
  expect(diff.buckets.renamedIcons).toHaveLength(1);
  expect(diff.buckets.renamedIcons[0].renamedTo).toBe("--icon-c");
  expect(diff.buckets.removedIcons.map((c) => c.name)).toEqual(["--icon-b"]);
  expect(diff.buckets.addedIcons).toEqual([]);
});

test("structural diff falls back to the first shared theme, and no-ref returns empty", () => {
  const before: Manifest = {
    provenance: prov("v1", "11.7.3"),
    themes: {
      custom: { "--only-before": { syntax: "<color>", inherits: true, value: "#111111" } },
    },
    icons: {},
  };
  const after: Manifest = {
    provenance: prov("v2", "11.7.3"),
    themes: { custom: { "--only-after": { syntax: "<color>", inherits: true, value: "#222222" } } },
    icons: {},
  };
  // "custom" isn't in THEME_ORDER, so referenceTheme takes shared[0].
  const diff = diffManifests(before, after);
  expect(diff.buckets.addedTokens.map((c) => c.name)).toEqual(["--only-after"]);
  expect(diff.buckets.removedTokens.map((c) => c.name)).toEqual(["--only-before"]);

  // No theme in common → structural diff is a no-op.
  const disjoint = diffManifests(before, {
    ...after,
    themes: { other: {} },
  });
  expect(disjoint.buckets.addedTokens).toEqual([]);
  expect(disjoint.buckets.removedTokens).toEqual([]);
});

test("serializeManifest is pretty, key-sorted, and newline-terminated", () => {
  const m = oneTheme("v1", [tok("--z", "#111111"), tok("--a", "#222222")]);
  const text = serializeManifest(m);
  expect(text.endsWith("\n")).toBe(true);
  // Keys are sorted, so "--a" is serialized before "--z".
  const parsed = JSON.parse(text) as Manifest;
  expect(Object.keys(parsed.themes.rebrand)).toEqual(["--a", "--z"]);
  expect(text).toContain("\n  "); // indented (pretty), not compact
});

test("manifestsEqual is order-independent but value-sensitive", () => {
  const a = oneTheme("v1", [tok("--a", "#111111"), tok("--b", "#222222")]);
  const b = oneTheme("v1", [tok("--b", "#222222"), tok("--a", "#111111")]);
  expect(manifestsEqual(a, b)).toBe(true);
  const c = oneTheme("v1", [tok("--a", "#999999"), tok("--b", "#222222")]);
  expect(manifestsEqual(a, c)).toBe(false);
});

test("toJsonReport is pretty JSON with a trailing newline", () => {
  const diff = diffManifests(oneTheme("v1", [tok("--a", "#111111")]), oneTheme("v2", []));
  const json = toJsonReport(diff);
  expect(json.endsWith("\n")).toBe(true);
  const parsed = JSON.parse(json) as ReturnType<typeof diffManifests>;
  expect(parsed.buckets.removedTokens[0].name).toBe("--a");
});

test("toMarkdownReport renders every populated section and flags manual review", () => {
  const before = oneTheme("v1", [
    tok("--color-gone", "#111111"),
    tok("--color-keep", "#111111"),
    tok("--len-keep", "1rem", { syntax: "*" }),
    tok("--num-keep", "5", { syntax: "<number>" }),
    tok("--ref", "var(--x)", { syntax: "*", refersTo: "--x" }),
    tok("--syn", "1px", { syntax: "<length>", inherits: true }),
    icon("--icon-gone", "data:image/svg+xml,GONE"),
    icon("--icon-rename-from", "data:image/svg+xml,MOVE"),
    icon("--icon-morph", "data:image/svg+xml,M1"),
  ]);
  const after = oneTheme("v2", [
    tok("--color-keep", "#999999"),
    tok("--color-new", "#333333"),
    tok("--len-keep", "2rem", { syntax: "*" }),
    tok("--num-keep", "9", { syntax: "<number>" }),
    tok("--ref", "var(--y)", { syntax: "*", refersTo: "--y" }),
    tok("--syn", "1px", { syntax: "<color>", inherits: true }),
    icon("--icon-rename-to", "data:image/svg+xml,MOVE"),
    icon("--icon-morph", "data:image/svg+xml,M2"),
    icon("--icon-new", "data:image/svg+xml,NEW"),
  ]);
  const md = toMarkdownReport(diffManifests(before, after));

  for (const heading of [
    "Removed tokens (deprecation candidates)",
    "Added tokens",
    "Value changes — colour",
    "Value changes — length/size",
    "Value changes — other",
    "Reference retargets",
    "`@property` syntax changes",
    "Removed icons",
    "Renamed icons",
    "Added icons",
    "Changed icons",
  ]) {
    expect(md).toContain(`### ${heading}`);
  }
  // Provenance line, rename arrow, per-theme + category annotations, and the review warning.
  expect(md).toContain("design-tokens `v1`");
  expect(md).toContain("→ `--icon-rename-to`");
  expect(md).toContain("_(color)_");
  expect(md).toContain("`rebrand`");
  expect(md).toContain("need manual review");
});

test("toMarkdownReport on a no-drift diff says so and skips manual review", () => {
  const m = oneTheme("v1", [tok("--a", "#111111")]);
  const md = toMarkdownReport(diffManifests(m, m));
  expect(md).toContain("No upstream drift");
  expect(md).toContain("No changes flagged for manual review");
  expect(md).toContain("_No token or icon changes._");
});

test("toMarkdownReport truncates a long list with an 'and N more' line", () => {
  const after = oneTheme(
    "v2",
    Array.from({ length: 45 }, (_, i) => tok(`--added-${i}`, "#111111")),
  );
  const md = toMarkdownReport(diffManifests(oneTheme("v1", []), after));
  expect(md).toContain("### Added tokens (45)");
  expect(md).toContain("…and 5 more");
});
