/**
 * `@pantoken/utils` — shared, upstream-free helpers used across the pantoken packages: the token
 * reference resolver (with `light-dark()` handling), the two token regexes (typed via `arkregex`),
 * kebab→camel case, and hex-colour parsing. Depends only on `@pantoken/model` (types) + `arkregex`,
 * so any package can use it without pulling the GitHub-only upstream.
 *
 * @module
 */
import { regex } from "arkregex";
import type { Token } from "@pantoken/model";

/** The colour mode to collapse `light-dark()` to. */
export type Mode = "light" | "dark";

// Pattern sources (also used to build fresh regexes where reuse would be unsafe).
const VAR_SOURCE = "var\\(\\s*(--[\\w-]+)[^)]*\\)";
const LIGHT_DARK_SOURCE = "^light-dark\\(\\s*(.+?)\\s*,\\s*(.+?)\\s*\\)$";

/** A `var(--custom-prop)` reference (optional fallback); capture group 1 is the property name. */
export const VAR_RE = regex(VAR_SOURCE, "g");
/** A `light-dark(<light>, <dark>)` value; capture groups 1 and 2 are the two branches. */
export const LIGHT_DARK_RE = regex(LIGHT_DARK_SOURCE);

const MAX_DEPTH = 12;

/** Options for {@link makeResolver}. */
export interface ResolveOptions {
  /** Collapse `light-dark()` to this branch; omit to keep `light-dark()` intact. */
  mode?: Mode;
  /** Tokens that override the base set (win on name collisions, e.g. a caller's IR over a theme). */
  overrides?: readonly Token[];
}

/**
 * Build a resolver that expands `var(--x)` references to concrete leaf values against `base` (plus
 * any `overrides`). With `mode` it collapses `light-dark()` to that branch; without, it leaves
 * `light-dark()` in place.
 *
 * @param base - The token set to resolve references against.
 * @param options - {@link ResolveOptions}.
 * @returns A function that resolves a value string.
 *
 * @example Expand a reference chain to its concrete leaf
 * ```ts
 * import { makeResolver } from "@pantoken/utils";
 * import type { Token } from "@pantoken/model";
 *
 * const ir: Token[] = [
 *   { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
 *   { name: "--instui-brand", syntax: "*", inherits: true, value: "var(--instui-leaf)" },
 * ];
 *
 * const resolve = makeResolver(ir);
 * resolve("var(--instui-brand)"); // → "#0374B5"
 * ```
 *
 * @example Collapse light-dark() with a mode, or keep it without one
 * ```ts
 * import { makeResolver } from "@pantoken/utils";
 * import type { Token } from "@pantoken/model";
 *
 * const ir: Token[] = [
 *   { name: "--instui-bg", syntax: "*", inherits: true, value: "light-dark(#fff, #000)" },
 * ];
 *
 * makeResolver(ir)("var(--instui-bg)");                 // → "light-dark(#fff, #000)"
 * makeResolver(ir, { mode: "light" })("var(--instui-bg)"); // → "#fff"
 * makeResolver(ir, { mode: "dark" })("var(--instui-bg)");  // → "#000"
 * ```
 *
 * @example Layer overrides that win on name collisions
 * ```ts
 * import { makeResolver } from "@pantoken/utils";
 * import type { Token } from "@pantoken/model";
 *
 * const ir: Token[] = [
 *   { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
 *   { name: "--instui-brand", syntax: "*", inherits: true, value: "var(--instui-leaf)" },
 * ];
 * const overrides: Token[] = [
 *   { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#000" },
 * ];
 *
 * makeResolver(ir, { overrides })("var(--instui-brand)"); // → "#000"
 * ```
 */
export function makeResolver(
  base: readonly Token[],
  options: ResolveOptions = {},
): (value: string) => string {
  const map = new Map(base.map((t) => [t.name, t.value]));
  for (const t of options.overrides ?? []) map.set(t.name, t.value);

  const pickMode = (value: string): string => {
    if (!options.mode) return value;
    const m = LIGHT_DARK_RE.exec(value.trim());
    return m ? (options.mode === "light" ? m[1] : m[2]) : value;
  };

  const expand = (value: string, depth: number): string => {
    const picked = pickMode(value);
    if (depth >= MAX_DEPTH || !picked.includes("var(")) return picked;
    // Fresh regex per call — a shared /g regex would corrupt its lastIndex across these recursive
    // replace() calls.
    return picked.replace(new RegExp(VAR_SOURCE, "g"), (whole, name: string) => {
      const inner = map.get(name);
      return inner === undefined ? whole : expand(inner, depth + 1);
    });
  };

  return (value) => expand(value, 0);
}

/**
 * Resolve every token's value against the set (see {@link makeResolver}), keyed by name.
 *
 * @example Resolve a whole IR to a name → value map
 * ```ts
 * import { resolveTokens } from "@pantoken/utils";
 * import type { Token } from "@pantoken/model";
 *
 * const ir: Token[] = [
 *   { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
 *   { name: "--instui-brand", syntax: "*", inherits: true, value: "var(--instui-leaf)" },
 *   { name: "--instui-bg", syntax: "*", inherits: true, value: "light-dark(#fff, #000)" },
 * ];
 *
 * const byName = resolveTokens(ir, { mode: "dark" });
 * byName.get("--instui-brand"); // → "#0374B5"
 * byName.get("--instui-bg");    // → "#000"
 * ```
 */
export function resolveTokens(
  base: readonly Token[],
  options: ResolveOptions = {},
): Map<string, string> {
  const resolve = makeResolver(base, options);
  return new Map(base.map((t) => [t.name, resolve(t.value)]));
}

/**
 * Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).
 *
 * @example
 * ```ts
 * import { camelCase } from "@pantoken/utils";
 *
 * camelCase("color-background-brand"); // → "colorBackgroundBrand"
 * ```
 */
export function camelCase(kebab: string): string {
  return kebab.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}

/** An RGBA colour: `r`/`g`/`b` are 0–255 integers, `a` is 0–1 (defaults to 1). */
export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Parse `#rgb`, `#rrggbb`, or `#rrggbbaa` to {@link Rgba}; returns `undefined` otherwise.
 *
 * @example
 * ```ts
 * import { parseHexColor } from "@pantoken/utils";
 *
 * parseHexColor("#fff");      // → { r: 255, g: 255, b: 255, a: 1 }
 * parseHexColor("#0374B5");   // → { r: 3, g: 116, b: 181, a: 1 }
 * parseHexColor("#00000080"); // → { r: 0, g: 0, b: 0, a: 0.5019… }
 * parseHexColor("nope");      // → undefined
 * ```
 */
export function parseHexColor(hex: string): Rgba | undefined {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(hex.trim());
  if (!m) return undefined;
  let h = m[1];
  if (h.length === 3) h = h.replace(/(.)/g, "$1$1");
  return {
    r: Number.parseInt(h.slice(0, 2), 16),
    g: Number.parseInt(h.slice(2, 4), 16),
    b: Number.parseInt(h.slice(4, 6), 16),
    a: h.length === 8 ? Number.parseInt(h.slice(6, 8), 16) / 255 : 1,
  };
}

// ── Drift / reference-integrity validation ──────────────────────────────────────────────────────
// Helpers to check that generated output stays faithful to the token IR: no references to tokens
// that don't exist (drift vs the source), and no `var()` refs left undefined within a stylesheet.

/**
 * Every `--instui-*` custom-property name that appears anywhere in `text`.
 *
 * @example
 * ```ts
 * import { extractInstuiRefs } from "@pantoken/utils";
 *
 * extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
 * // → Set { "--instui-color-text-base" }
 * ```
 */
export function extractInstuiRefs(text: string): Set<string> {
  return new Set([...text.matchAll(/--instui-[\w-]+/g)].map((m) => m[0]));
}

/**
 * The set of token names an IR defines.
 *
 * @example
 * ```ts
 * import { tokenNames } from "@pantoken/utils";
 * import type { Token } from "@pantoken/model";
 *
 * const ir: Token[] = [
 *   { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
 * ];
 * tokenNames(ir); // → Set { "--instui-leaf" }
 * ```
 */
export function tokenNames(ir: readonly Token[]): Set<string> {
  return new Set(ir.map((t) => t.name));
}

/**
 * Drift check: `--instui-*` names in `text` that the IR doesn't define (sorted; empty means no
 * drift). Use for outputs that *reference* tokens defined elsewhere — e.g. the docusaurus/vitepress
 * bridges, whose `var(--instui-*)` targets must all be real tokens.
 *
 * @param text - The generated output.
 * @param ir - The source token IR.
 * @returns The unknown token names.
 *
 * @example
 * ```ts
 * import { unknownReferences } from "@pantoken/utils";
 * import type { Token } from "@pantoken/model";
 *
 * const ir: Token[] = [
 *   { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
 * ];
 *
 * unknownReferences("--x: var(--instui-leaf); --y: var(--instui-gone);", ir);
 * // → ["--instui-gone"]
 * unknownReferences("--x: var(--instui-leaf);", ir); // → []  (no drift)
 * ```
 */
export function unknownReferences(text: string, ir: readonly Token[]): string[] {
  const names = tokenNames(ir);
  return [...extractInstuiRefs(text)].filter((name) => !names.has(name)).sort();
}

/**
 * Self-containment check: `--instui-*` names referenced via `var()` in a stylesheet that it never
 * defines (as an `@property` registration or a `--x:` declaration). Sorted; empty means every
 * reference resolves within the same output. Use for self-contained stylesheets (css, pendo).
 *
 * @param css - The generated stylesheet.
 * @returns The dangling reference names.
 *
 * @example
 * ```ts
 * import { danglingReferences } from "@pantoken/utils";
 *
 * // Self-contained: the referenced property is also defined here.
 * danglingReferences("@property --instui-a {} .b { color: var(--instui-a); }"); // → []
 *
 * // Dangling: `--instui-b` is referenced but never defined.
 * danglingReferences(
 *   ":root { --instui-a: red; } .b { color: var(--instui-a); background: var(--instui-b); }",
 * ); // → ["--instui-b"]
 * ```
 */
export function danglingReferences(css: string): string[] {
  const referenced = new Set([...css.matchAll(/var\(\s*(--instui-[\w-]+)/g)].map((m) => m[1]));
  const defined = new Set<string>();
  for (const m of css.matchAll(/@property\s+(--instui-[\w-]+)/g)) defined.add(m[1]);
  for (const m of css.matchAll(/(--instui-[\w-]+)\s*:/g)) defined.add(m[1]);
  return [...referenced].filter((name) => !defined.has(name)).sort();
}
