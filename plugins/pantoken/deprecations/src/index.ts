/**
 * `@pantoken/plugin-deprecations` — lifecycle-aware compatibility shims for dropped upstream tokens.
 *
 * When an upstream release drops a `--instui-*` token, a hand-authored {@link DeprecationLedger}
 * records its lifecycle: when it was deprecated, the upstream minor that will remove it, and how to
 * keep it working meanwhile — either forward to a canonical token (`replacement` → `var(...)`) or
 * freeze its last-known literal (`value`). This plugin appends one shim token per entry. Because the
 * shim is a single `var(...)` or a plain value, `defineToken` records its `refersTo`/syntax and
 * `toCss` emits it, so the shim rides into css/scss/less/stylus/wordpress/vanilla with no extra wiring.
 *
 * The retirement is enforced elsewhere (the upgrade pipeline hard-fails a bump once an entry's
 * `removeIn` upstream minor is reached, forcing the entry to be retired and a consumer minor cut).
 * {@link dueForRemoval} is the check that powers it; {@link describeLifecycle} powers the docs.
 *
 * @example
 * ```ts
 * import { buildTokens } from "@pantoken/core";
 * import { deprecationShims } from "@pantoken/plugin-deprecations";
 * import ledger from "@pantoken/tokens/deprecations.json" with { type: "json" };
 *
 * buildTokens({ theme: "rebrand", plugins: [deprecationShims(ledger)] });
 * ```
 *
 * @module
 * @beta
 */
import { definePlugin } from "@pantoken/plugin-kit";
import type { DeprecationEntry, DeprecationLedger, PantokenPlugin } from "@pantoken/model";

/** The current resolved version of each upstream tier (from `@pantoken/tokens` provenance). */
export interface UpstreamVersions {
  /** `@instructure/ui-*` resolved version, e.g. `"11.7.4"`. */
  ui: string;
  /** `@instructure/instructure-design-tokens` pinned ref, e.g. `"v1.5.0"`. */
  designTokens: string;
}

/** A parsed `<tier>@<version>` upstream reference. */
export interface ParsedRef {
  tier: "ui" | "design-tokens";
  version: number[];
}

/** The shim value for an entry: `var(replacement)`, the frozen literal, or `undefined` if neither. */
export function shimValue(entry: DeprecationEntry): string | undefined {
  if (entry.replacement) return `var(${entry.replacement})`;
  if (entry.value) return entry.value;
  return undefined;
}

/** The entries that can emit a shim (they carry a replacement or a frozen value). */
export function shimEntries(ledger: DeprecationLedger): DeprecationEntry[] {
  return ledger.entries.filter((entry) => shimValue(entry) !== undefined);
}

/** True when the ledger records a lifecycle for `token`. */
export function ledgerCovers(ledger: DeprecationLedger, token: string): boolean {
  return ledger.entries.some((entry) => entry.token === token);
}

/** Parse a `<tier>@<version>` ref (version may lead with `v`). Returns `undefined` if malformed. */
export function parseUpstreamRef(ref: string): ParsedRef | undefined {
  const at = ref.indexOf("@");
  if (at <= 0) return undefined;
  const tier = ref.slice(0, at);
  if (tier !== "ui" && tier !== "design-tokens") return undefined;
  const version = ref
    .slice(at + 1)
    .replace(/^v/u, "")
    .split(".")
    .map((part) => Number.parseInt(part, 10))
    .filter((n) => !Number.isNaN(n));
  return version.length ? { tier, version } : undefined;
}

/** Compare two dotted version arrays: negative if a < b, 0 if equal, positive if a > b. */
export function compareVersions(a: number[], b: number[]): number {
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/**
 * The entries whose `removeIn` upstream minor has been reached by the current build — i.e. shims that
 * must now be retired. The upgrade pipeline fails a bless while any are present.
 *
 * @param ledger - The deprecation ledger.
 * @param current - The current resolved upstream versions.
 * @returns The entries due for removal.
 */
export function dueForRemoval(
  ledger: DeprecationLedger,
  current: UpstreamVersions,
): DeprecationEntry[] {
  return ledger.entries.filter((entry) => {
    const parsed = parseUpstreamRef(entry.removeIn);
    if (!parsed) return false;
    const currentRaw = parsed.tier === "ui" ? current.ui : current.designTokens;
    const parsedCurrent = currentRaw
      .replace(/^v/u, "")
      .split(".")
      .map((p) => Number.parseInt(p, 10));
    return compareVersions(parsedCurrent, parsed.version) >= 0;
  });
}

/** A one-line human description of an entry's lifecycle, for docs and changelogs. */
export function describeLifecycle(entry: DeprecationEntry): string {
  const fate = entry.replacement ? `use \`${entry.replacement}\`` : "no replacement";
  return `deprecated in ${entry.deprecatedIn}, removed in ${entry.removeIn} (${fate})`;
}

/**
 * Create the deprecation-shim plugin from a ledger.
 *
 * @param ledger - The {@link DeprecationLedger} (e.g. `formats/tokens/deprecations.json`).
 * @returns A {@link PantokenPlugin} whose `tokens` hook appends one shim per entry.
 */
export function deprecationShims(ledger: DeprecationLedger): PantokenPlugin {
  const entries = shimEntries(ledger);
  return definePlugin({
    name: "@pantoken/plugin-deprecations",
    tokens: ({ tokens, define }) => [
      ...tokens,
      ...entries.map((entry) =>
        define({
          name: entry.token,
          value: shimValue(entry) as string,
          meta: {
            deprecated: {
              ...(entry.replacement ? { replacement: entry.replacement } : {}),
              deprecatedIn: entry.deprecatedIn,
              removeIn: entry.removeIn,
              ...(entry.note ? { note: entry.note } : {}),
            },
          },
        }),
      ),
    ],
  });
}

export default deprecationShims;
