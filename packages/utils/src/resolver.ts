/**
 * The token reference resolver: expands `var(--x)` chains to concrete leaf values, with optional
 * `light-dark()` collapsing.
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
export const VAR_RE: RegExp = regex(VAR_SOURCE, "g");
/** A `light-dark(<light>, <dark>)` value; capture groups 1 and 2 are the two branches. */
export const LIGHT_DARK_RE: RegExp = regex(LIGHT_DARK_SOURCE);

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
