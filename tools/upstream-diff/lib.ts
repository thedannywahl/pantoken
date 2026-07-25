/**
 * The upstream-drift library: project the built token IR into a compact, committable manifest, and
 * classify the difference between two manifests into review buckets. Pure (no IO) so it unit-tests
 * cleanly; the runner (`index.ts`) wires it to the live `@pantoken/tokens` build and the committed
 * baseline.
 *
 * Design choices worth knowing:
 * - The manifest stores each token's *authored* value (`#0374B5`, `var(--x)`, `light-dark(a, b)`),
 *   not a fully-resolved leaf. A change deep in a primitive shows up once — on that primitive — rather
 *   than fanning out across every semantic token that references it, so the diff reads as root-cause.
 * - Every theme carries the same token *set* (only values differ per theme), so structural add/remove
 *   is computed on one reference theme, while value/ref/syntax changes are compared per theme.
 * - Icon `<image>` values are huge data-URIs, so they're stored as a short hash. A removed icon whose
 *   hash matches an added icon is reported once as a rename.
 * - Reference integrity (dangling / unknown `var()` refs) is NOT recomputed here — `validate-generated`
 *   already gates it on every build, so a bump that breaks a reference fails `ready` regardless.
 *
 * @module
 */
import { createHash } from "node:crypto";
import type { Theme, Token } from "@pantoken/tokens";
import type { Provenance } from "@pantoken/tokens/meta";

/** A non-icon token's compact snapshot. */
export interface TokenEntry {
  syntax: string;
  inherits: boolean;
  value: string;
  themed?: boolean;
  refersTo?: string;
  /** True when this token is a deprecation shim (so retiring it isn't an unhandled upstream removal). */
  deprecated?: boolean;
}

/** An icon token's compact snapshot (the fat data-URI is stored as a hash). */
export interface IconEntry {
  source?: string;
  style?: string;
  viewBox?: string;
  bidirectional?: boolean;
  hash: string;
}

/** The committed drift baseline: provenance + per-theme token snapshots + a theme-independent icon set. */
export interface Manifest {
  provenance: Provenance;
  themes: Record<string, Record<string, TokenEntry>>;
  icons: Record<string, IconEntry>;
}

/** The kind of a single classified change. */
export type ChangeKind =
  | "token-added"
  | "token-removed"
  | "token-value-changed"
  | "token-syntax-changed"
  | "token-ref-changed"
  | "icon-added"
  | "icon-removed"
  | "icon-renamed"
  | "icon-changed";

/** The value family a change touches, derived from `@property` syntax — routes the review. */
export type ValueCategory = "color" | "length" | "number" | "image" | "other";

/** One classified change between two manifests. */
export interface TokenChange {
  name: string;
  kind: ChangeKind;
  /** The theme a value/ref/syntax change occurred in (omitted for structural + icon changes). */
  theme?: string;
  before?: string;
  after?: string;
  /** For value changes: the value family, so color/size reviews can be split out. */
  category?: ValueCategory;
  /** For an icon rename: the new name the artwork moved to. */
  renamedTo?: string;
}

/** The full classified diff between a baseline and a current manifest. */
export interface UpstreamDiff {
  before: Provenance;
  after: Provenance;
  buckets: {
    addedTokens: TokenChange[];
    removedTokens: TokenChange[];
    valueChanges: TokenChange[];
    syntaxChanges: TokenChange[];
    refChanges: TokenChange[];
    addedIcons: TokenChange[];
    removedIcons: TokenChange[];
    renamedIcons: TokenChange[];
    changedIcons: TokenChange[];
  };
  /** The subset a human must look at: removals, color/size/number value changes, syntax flips, icon loss. */
  manualReview: TokenChange[];
  summary: { total: number; byBucket: Record<string, number>; needsReview: boolean };
}

const THEME_ORDER: Theme[] = ["rebrand", "canvas", "canvasHighContrast"];

/** True for an `<image>` icon token. */
function isIcon(token: Token): boolean {
  return token.meta?.kind === "icon" || token.syntax === "<image>";
}

/** A short, stable hash of an icon's data-URI value. */
function hashValue(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

/** The value family for a `@property` syntax. */
export function categoryOf(syntax: string): ValueCategory {
  if (syntax.includes("<color>")) return "color";
  if (syntax.includes("<length>") || syntax.includes("<percentage>")) return "length";
  if (syntax.includes("<number>") || syntax.includes("<integer>") || syntax.includes("<angle>")) {
    return "number";
  }
  if (syntax.includes("<image>")) return "image";
  return "other";
}

/**
 * The value family for a change, falling back to the value when the syntax is `*`. Chromium registers
 * `rem`/`em` sizes and `light-dark()` colours as `*` (not computationally independent), so a
 * size or colour change would otherwise hide in "other" and escape the manual-review tally.
 */
function categoryOfChange(syntax: string, value: string): ValueCategory {
  const bySyntax = categoryOf(syntax);
  if (bySyntax !== "other") return bySyntax;
  if (/-?\d*\.?\d+(rem|em|px|vh|vw|vmin|vmax|ch|%)\b/u.test(value)) return "length";
  if (/(^#|\brgb|\bhsl|\bokl?ch|\blight-dark\(|\bcolor-mix\()/u.test(value)) return "color";
  return "other";
}

/** The manifest icon record for a token — theme-independent metadata plus a content hash. */
function iconEntryOf(token: Token): Manifest["icons"][string] {
  return {
    ...(token.meta?.source ? { source: token.meta.source } : {}),
    ...(token.meta?.style ? { style: token.meta.style } : {}),
    ...(token.meta?.viewBox ? { viewBox: token.meta.viewBox } : {}),
    ...(token.meta?.bidirectional ? { bidirectional: true } : {}),
    hash: hashValue(token.value),
  };
}

/** The manifest token record — the comparable fields plus optional flags when present. */
function tokenEntryOf(token: Token): TokenEntry {
  return {
    syntax: token.syntax,
    inherits: token.inherits,
    value: token.value,
    ...(token.themed ? { themed: true } : {}),
    ...(token.refersTo ? { refersTo: token.refersTo } : {}),
    ...(token.meta?.deprecated ? { deprecated: true } : {}),
  };
}

/**
 * Project the built IR (every theme) plus provenance into a compact {@link Manifest} — per-theme token
 * entries plus the theme-independent icon set. The manifest is what upstream diffs compare against.
 *
 * @param input - The per-theme `Token[]` (from `@pantoken/tokens`) and the vendored {@link Provenance}.
 * @returns The manifest to commit as a baseline or diff against one.
 */
export function buildManifest(input: {
  themes: Record<Theme, Token[]>;
  provenance: Provenance;
}): Manifest {
  const themes: Manifest["themes"] = {};
  const icons: Manifest["icons"] = {};

  for (const theme of Object.keys(input.themes) as Theme[]) {
    const entries: Record<string, TokenEntry> = {};
    for (const token of input.themes[theme]) {
      if (isIcon(token)) {
        // Icons are theme-independent; record each once (later themes just re-confirm the same set).
        icons[token.name] ??= iconEntryOf(token);
        continue;
      }
      entries[token.name] = tokenEntryOf(token);
    }
    themes[theme] = entries;
  }

  return { provenance: input.provenance, themes, icons };
}

/** The reference theme used for structural (add/remove) comparison — the first present in both. */
function referenceTheme(before: Manifest, after: Manifest): string | undefined {
  const shared = Object.keys(after.themes).filter((t) => t in before.themes);
  return THEME_ORDER.find((t) => shared.includes(t)) ?? shared[0];
}

type DiffBuckets = UpstreamDiff["buckets"];

/** Structural add/remove, computed on one reference theme (the token set is identical across themes). */
function diffStructuralTokens(before: Manifest, after: Manifest, buckets: DiffBuckets): void {
  const ref = referenceTheme(before, after);
  if (!ref) return;
  const b = before.themes[ref] ?? {};
  const a = after.themes[ref] ?? {};
  for (const name of Object.keys(a)) {
    if (!(name in b)) buckets.addedTokens.push({ name, kind: "token-added" });
  }
  for (const name of Object.keys(b)) {
    if (!(name in a)) buckets.removedTokens.push({ name, kind: "token-removed" });
  }
}

/** Value / ref / syntax changes, compared per theme for tokens present in both. */
function diffTokenFields(before: Manifest, after: Manifest, buckets: DiffBuckets): void {
  for (const theme of Object.keys(after.themes)) {
    const b = before.themes[theme];
    const a = after.themes[theme];
    if (!b || !a) continue;
    for (const name of Object.keys(a)) {
      const bEntry = b[name];
      const aEntry = a[name];
      if (!bEntry) continue;
      if (bEntry.refersTo !== aEntry.refersTo) {
        buckets.refChanges.push({
          name,
          theme,
          kind: "token-ref-changed",
          before: bEntry.refersTo,
          after: aEntry.refersTo,
        });
      } else if (bEntry.value !== aEntry.value) {
        buckets.valueChanges.push({
          name,
          theme,
          kind: "token-value-changed",
          before: bEntry.value,
          after: aEntry.value,
          category: categoryOfChange(aEntry.syntax, aEntry.value),
        });
      }
      if (bEntry.syntax !== aEntry.syntax || bEntry.inherits !== aEntry.inherits) {
        buckets.syntaxChanges.push({
          name,
          theme,
          kind: "token-syntax-changed",
          before: `${bEntry.syntax} (inherits: ${bEntry.inherits})`,
          after: `${aEntry.syntax} (inherits: ${aEntry.inherits})`,
        });
      }
    }
  }
}

/** Icons: add / remove / rename (same artwork, new name) / change (same name, new artwork). */
function diffIcons(before: Manifest, after: Manifest, buckets: DiffBuckets): void {
  const removedIconNames = Object.keys(before.icons).filter((n) => !(n in after.icons));
  const addedIconNames = Object.keys(after.icons).filter((n) => !(n in before.icons));
  const addedByHash = new Map(addedIconNames.map((n) => [after.icons[n].hash, n]));
  const consumedAdds = new Set<string>();
  for (const name of removedIconNames) {
    const match = addedByHash.get(before.icons[name].hash);
    if (match && !consumedAdds.has(match)) {
      consumedAdds.add(match);
      buckets.renamedIcons.push({ name, kind: "icon-renamed", renamedTo: match });
    } else {
      buckets.removedIcons.push({ name, kind: "icon-removed" });
    }
  }
  for (const name of addedIconNames) {
    if (!consumedAdds.has(name)) buckets.addedIcons.push({ name, kind: "icon-added" });
  }
  for (const name of Object.keys(after.icons)) {
    const b = before.icons[name];
    if (b && b.hash !== after.icons[name].hash) {
      buckets.changedIcons.push({
        name,
        kind: "icon-changed",
        before: b.hash,
        after: after.icons[name].hash,
      });
    }
  }
}

/**
 * Classify the difference between two manifests into review buckets.
 *
 * @param before - The committed baseline manifest.
 * @param after - The freshly built manifest.
 * @returns The classified {@link UpstreamDiff}.
 */
export function diffManifests(before: Manifest, after: Manifest): UpstreamDiff {
  const buckets: UpstreamDiff["buckets"] = {
    addedTokens: [],
    removedTokens: [],
    valueChanges: [],
    syntaxChanges: [],
    refChanges: [],
    addedIcons: [],
    removedIcons: [],
    renamedIcons: [],
    changedIcons: [],
  };

  diffStructuralTokens(before, after, buckets);
  diffTokenFields(before, after, buckets);
  diffIcons(before, after, buckets);

  const manualReview: TokenChange[] = [
    ...buckets.removedTokens,
    ...buckets.valueChanges.filter(
      (c) => c.category === "color" || c.category === "length" || c.category === "number",
    ),
    ...buckets.syntaxChanges,
    ...buckets.removedIcons,
    ...buckets.renamedIcons,
  ];

  const byBucket = Object.fromEntries(
    Object.entries(buckets).map(([k, v]) => [k, v.length]),
  ) as Record<string, number>;
  const total = Object.values(byBucket).reduce((sum, n) => sum + n, 0);

  return {
    before: before.provenance,
    after: after.provenance,
    buckets,
    manualReview,
    summary: { total, byBucket, needsReview: manualReview.length > 0 },
  };
}

/** Recursively sort object keys so serialization is stable regardless of insertion order. */
function sortKeys(v: unknown): unknown {
  if (v === null || typeof v !== "object") return v;
  if (Array.isArray(v)) return v.map(sortKeys);
  const o = v as Record<string, unknown>;
  return Object.fromEntries(
    Object.keys(o)
      .sort()
      .map((k) => [k, sortKeys(o[k])]),
  );
}

/** Canonical (compact, key-sorted) JSON of a manifest, for an exact equality check. */
function canonicalize(manifest: Manifest): string {
  return JSON.stringify(sortKeys(manifest));
}

/** Pretty, key-sorted JSON for the committed baseline — stable so PR diffs show only real changes. */
export function serializeManifest(manifest: Manifest): string {
  return `${JSON.stringify(sortKeys(manifest), null, 2)}\n`;
}

/** True when two manifests are byte-identical after canonicalization (the drift-gate check). */
export function manifestsEqual(a: Manifest, b: Manifest): boolean {
  return canonicalize(a) === canonicalize(b);
}

/** The machine-readable JSON report. */
export function toJsonReport(diff: UpstreamDiff): string {
  return `${JSON.stringify(diff, null, 2)}\n`;
}

function renderList(changes: TokenChange[], limit = 40): string {
  if (changes.length === 0) return "_none_\n";
  const lines = changes.slice(0, limit).map((c) => {
    const where = c.theme ? ` \`${c.theme}\`` : "";
    const rename = c.renamedTo ? ` → \`${c.renamedTo}\`` : "";
    const cat = c.category ? ` _(${c.category})_` : "";
    const delta =
      c.before !== undefined || c.after !== undefined
        ? `: \`${c.before ?? "—"}\` → \`${c.after ?? "—"}\``
        : "";
    return `- \`${c.name}\`${where}${rename}${cat}${delta}`;
  });
  if (changes.length > limit) lines.push(`- …and ${changes.length - limit} more`);
  return `${lines.join("\n")}\n`;
}

/** The human-readable Markdown report (PR comment / console summary). */
export function toMarkdownReport(diff: UpstreamDiff): string {
  const { before, after, buckets, summary } = diff;
  const heading = summary.total === 0 ? "No upstream drift" : `${summary.total} upstream change(s)`;
  const provLine = (p: UpstreamDiff["before"]): string =>
    `design-tokens \`${p.designTokens.ref}\`@\`${p.designTokens.commit.slice(0, 7)}\`, ui-icons \`${p.uiIcons.resolved}\``;

  const sections: [string, TokenChange[]][] = [
    ["Removed tokens (deprecation candidates)", buckets.removedTokens],
    ["Added tokens", buckets.addedTokens],
    ["Value changes — colour", buckets.valueChanges.filter((c) => c.category === "color")],
    ["Value changes — length/size", buckets.valueChanges.filter((c) => c.category === "length")],
    [
      "Value changes — other",
      buckets.valueChanges.filter((c) => c.category !== "color" && c.category !== "length"),
    ],
    ["Reference retargets", buckets.refChanges],
    ["`@property` syntax changes", buckets.syntaxChanges],
    ["Removed icons", buckets.removedIcons],
    ["Renamed icons", buckets.renamedIcons],
    ["Added icons", buckets.addedIcons],
    ["Changed icons", buckets.changedIcons],
  ];

  const body = sections
    .filter(([, list]) => list.length > 0)
    .map(([title, list]) => `### ${title} (${list.length})\n\n${renderList(list)}`)
    .join("\n");

  return [
    `## Upstream drift — ${heading}`,
    "",
    `**Before:** ${provLine(before)}`,
    `**After:** ${provLine(after)}`,
    "",
    summary.needsReview
      ? `⚠️ ${diff.manualReview.length} change(s) need manual review (removals, colour/size/number value changes, syntax flips, icon loss).`
      : "✓ No changes flagged for manual review.",
    "",
    "_Reference integrity (dangling / unknown `var()` refs) is gated separately by `validate-generated`._",
    "",
    body || "_No token or icon changes._",
  ].join("\n");
}
