/**
 * Opt-in utility classes for the raw pantoken primitive palette (`--instui-primitive-*`).
 *
 * The semantic utilities in `@pantoken/components` deliberately expose only semantic tokens — a color
 * override there is always a role (`bg-brand`), never a raw swatch. This package is the escape hatch:
 * one class per primitive token for the rare case a developer needs the palette directly. Load it on
 * its own (`@pantoken/plugin-primitives/primitives.css`), separate from the semantic layer.
 *
 * @example Build the primitive stylesheet
 * ```ts
 * import { primitivesCss } from "@pantoken/plugin-primitives";
 * import { tokens } from "@pantoken/tokens";
 *
 * const names = (p: string) => tokens.filter((t) => t.name.startsWith(p)).map((t) => t.name);
 * const css = primitivesCss({
 *   color: names("--instui-primitive-color-"),
 *   fontFamily: names("--instui-primitive-font-family-"),
 *   fontWeight: names("--instui-primitive-font-weight-"),
 * });
 * // .instui-bg-primitive-color-white { background: var(--instui-primitive-color-white); }
 * ```
 *
 * @module
 * @beta
 */
import { tokenUtilitiesCss } from "@pantoken/utils";

/** Full primitive token names per family (e.g. `"--instui-primitive-color-white"`). */
export interface PrimitiveTokenNames {
  /** `--instui-primitive-color-*` — emitted as `bg`/`fg`/`border` utilities. */
  color: readonly string[];
  /** `--instui-primitive-font-family-*` — emitted as `font-family` utilities. */
  fontFamily: readonly string[];
  /** `--instui-primitive-font-weight-*` — emitted as `font-weight` utilities. */
  fontWeight: readonly string[];
}

/** Options for {@link primitivesCss}. */
export interface PrimitivesOptions {
  /**
   * The class prefix. A truthy string namespaces every class (`"instui"` → `.instui-bg-…`); any falsy
   * value drops the prefix entirely (`.bg-…`). The shipped `primitives.css` is built with `"instui"`.
   */
  prefix?: string | null;
}

/**
 * Build the primitive utility stylesheet. Colors get the same `bg`/`fg`/`border` shape as the semantic
 * color utilities, but keyed on the primitive token name (`.<prefix>-bg-primitive-color-white`); font
 * primitives map to their one property via the shared token-to-class transformer. Every class only ever
 * points at a real `--instui-primitive-*` token — no arbitrary values.
 *
 * @param names - {@link PrimitiveTokenNames}.
 * @param options - {@link PrimitivesOptions}.
 * @returns The CSS string.
 */
export function primitivesCss(names: PrimitiveTokenNames, options: PrimitivesOptions = {}): string {
  const prefix = options.prefix || "";
  const p = prefix ? `${prefix}-` : "";
  const tail = (token: string): string => token.replace(/^--instui-/, "");
  const color = names.color
    .flatMap((token) => [
      `.${p}bg-${tail(token)} { background: var(${token}); }`,
      `.${p}fg-${tail(token)} { color: var(${token}); }`,
      `.${p}border-${tail(token)} { border-color: var(${token}); }`,
    ])
    .join("\n");
  const fonts = tokenUtilitiesCss(
    [
      { property: "font-family", tokens: names.fontFamily },
      { property: "font-weight", tokens: names.fontWeight },
    ],
    { prefix },
  ).trim();
  return `/* InstUI primitive utilities (@pantoken/plugin-primitives) — prefix: ${prefix} */\n${color}\n${fonts}\n`;
}

export default primitivesCss;
