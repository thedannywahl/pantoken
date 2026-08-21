/**
 * Token → utility-class emitters. Pure string transforms (token name → `.class { prop: var(--token) }`),
 * with no InstUI-look opinion — the caller supplies which token names to render. `@pantoken/components`
 * feeds them a curated *semantic* allowlist; `@pantoken/plugin-primitives` feeds the raw palette. They
 * live here (not in a format) so the primitive tier doesn't have to reach up into the component library.
 *
 * @module
 */

/** Options shared by the utility-class emitters. */
export interface UtilityOptions {
  /**
   * The class prefix. Any truthy string namespaces every class (`"instui"` → `.instui-bg-…`); any
   * falsy value (`null`/`undefined`/`""`) drops the prefix entirely (`.bg-…`).
   */
  prefix?: string | null;
  /**
   * Component base-class names (e.g. `"button"`, `"view"`) to also emit a chained alias for, per
   * rule — `.<prefix>-bg-danger` (bare) plus `.<prefix>-button.-bg-danger` (chained), so the same
   * modifier works standalone or attached to any component. Omit for bare-only output (unchanged
   * behavior).
   */
  chainTargets?: readonly string[];
}

/** One semantic colour family entry: a bare name (resolved against `--instui-color-<family>-<name>`)
 *  or an explicit `[name, value]` pair — the second element is `var()`-wrapped if it's a `--custom-prop`
 *  name, or used verbatim otherwise (a `light-dark(…)` expression, a raw keyword like `transparent`). */
export type ColorUtilityEntry = string | readonly [name: string, value: string];

/** The semantic colour token names (or explicit `[name, token]` pairs) per family. */
export interface ColorUtilityNames {
  background: readonly ColorUtilityEntry[];
  text: readonly ColorUtilityEntry[];
  stroke: readonly ColorUtilityEntry[];
}

/**
 * Build the semantic-colour utility stylesheet: `.<prefix>-bg-<name>` (background),
 * `.<prefix>-text-<name>` (text colour), `.<prefix>-border-<name>` (border colour), one per semantic
 * colour token. Overrides are therefore only ever token-valid — no primitives, no arbitrary hex. Pass
 * the token names per family (e.g. from `@pantoken/tokens`), or an explicit `[name, token]` pair to
 * source a name from a different token than the family's own scale.
 *
 * @param names - {@link ColorUtilityNames}.
 * @param options - {@link UtilityOptions}.
 * @returns The CSS string.
 *
 * @demo self:color-utilities
 */
export function colorUtilitiesCss(names: ColorUtilityNames, options: UtilityOptions = {}): string {
  const prefix = options.prefix || "";
  const p = prefix ? `${prefix}-` : "";
  const chainTargets = options.chainTargets ?? [];
  const emit = (
    family: string,
    util: string,
    prop: string,
    list: readonly ColorUtilityEntry[],
  ): string =>
    list
      .map((entry) => {
        const isPair = (e: ColorUtilityEntry): e is readonly [string, string] =>
          typeof e !== "string";
        const [n, token] = isPair(entry) ? entry : [entry, `--instui-color-${family}-${entry}`];
        // A `--custom-prop` name gets wrapped in `var()`; anything else (a `light-dark(…)` expression,
        // a raw keyword like `transparent`) is used verbatim — lets a `[name, value]` pair source a
        // computed value, not just a single token reference.
        const value = token.startsWith("--") ? `var(${token})` : token;
        const modifier = `.-${util}-${n}`;
        const selectors = [
          `.${p}${util}-${n}`,
          ...chainTargets.map((target) => `.${p}${target}${modifier}`),
        ];
        return `${selectors.join(", ")} { ${prop}: ${value}; }`;
      })
      .join("\n");
  const rules = [
    emit("background", "bg", "background", names.background),
    emit("text", "text", "color", names.text),
    emit("stroke", "border", "border-color", names.stroke),
  ].join("\n");
  return `/* InstUI semantic colour utilities (@pantoken/utils) — prefix: ${prefix} */\n${rules}\n`;
}

/** A set of tokens that all map to one CSS property (e.g. every `--instui-font-weight-*` → `font-weight`). */
export interface TokenUtilityGroup {
  /** The CSS property the tokens set (e.g. `"font-weight"`, `"border-radius"`, `"box-shadow"`). */
  property: string;
  /** Full token names (e.g. `"--instui-font-weight-body-strong"`); the `--instui-` tail becomes the class. */
  tokens: readonly string[];
}

/**
 * Build token-driven utility classes: one class per token, applying it to its natural CSS property. The
 * token's `--instui-` tail is the class name, so `--instui-font-weight-body-strong` under property
 * `font-weight` yields
 * `.<prefix>-font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }`. Use it for
 * every "one token → one property" family (font-family/weight, line-height, border-radius, border-width,
 * opacity, box-shadow). Colour and spacing keep their own builders — one token maps to several
 * properties there. Pass the token names per property (e.g. filtered from `@pantoken/tokens`).
 *
 * @param groups - one {@link TokenUtilityGroup} per CSS property.
 * @param options - {@link UtilityOptions}.
 * @returns The CSS string.
 *
 * @demo self:token-utilities
 */
export function tokenUtilitiesCss(
  groups: readonly TokenUtilityGroup[],
  options: UtilityOptions = {},
): string {
  const prefix = options.prefix || "";
  const p = prefix ? `${prefix}-` : "";
  const chainTargets = options.chainTargets ?? [];
  const rules = groups
    .flatMap(({ property, tokens }) =>
      tokens.map((token) => {
        const name = token.replace(/^--instui-/, "");
        const modifier = `.-${name}`;
        const selectors = [
          `.${p}${name}`,
          ...chainTargets.map((target) => `.${p}${target}${modifier}`),
        ];
        return `${selectors.join(", ")} { ${property}: var(${token}); }`;
      }),
    )
    .join("\n");
  return `/* InstUI token utilities (@pantoken/utils) — prefix: ${prefix} */\n${rules}\n`;
}
