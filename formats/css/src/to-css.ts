/**
 * `toCss` — turn the token IR into CSS: concrete tokens become typed `@property` registrations,
 * themed/reference tokens become scoped declarations. Plugins can contribute or post-process CSS.
 *
 * @module
 */
import { checkPlugins } from "@pantoken/plugin-kit";
import { buildCssFile } from "./emit.ts";
import type { CssContribution, PantokenPlugin, PropertyRule, Token } from "@pantoken/model";

/** True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`). */
function isContextual(value: string): boolean {
  return /var\(|light-dark\(/.test(value);
}

/**
 * Which half of the sheet to emit.
 *
 * `@property` registrations are document-global — the last registration of a given name wins for the
 * whole document — so two full sheets on one page fight over every concrete token. Emitting
 * registrations once (`"properties"`) and each theme as declarations only (`"declarations"`) lets
 * several themes coexist.
 */
export type CssEmitTarget = "all" | "properties" | "declarations";

/** Options for {@link toCss}. */
export interface ToCssOptions {
  /** The selector scoped declarations are emitted under (default `":root"`). */
  scope?: string;
  /** Plain cascade layer name wrapping the declarations (no `@` prefix). Omit to skip the wrapper. */
  layer?: string;
  /** Which half of the sheet to emit (default `"all"`). */
  emit?: CssEmitTarget;
  /**
   * Emit every token as a declaration rather than routing concrete tokens to `@property`. Required
   * for a theme block that can nest inside another theme's subtree: an incomplete block would
   * inherit the enclosing theme's values for the tokens it omits.
   */
  declareAll?: boolean;
  /** Plugins whose `css` hooks run after the base CSS is built (default: none). */
  plugins?: readonly PantokenPlugin[];
}

function marked(marker: string | undefined, css: string): string {
  return marker ? `/* ${marker} */\n${css}` : css;
}

/**
 * Emit CSS for a token IR.
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @param options - {@link ToCssOptions}.
 * @returns The CSS string.
 *
 * @example Build the default stylesheet
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { tokens } from "@pantoken/tokens";
 *
 * const stylesheet = toCss(tokens); // declarations under :root
 * ```
 *
 * @example Scope declarations to a class and build another theme
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 *
 * toCss(byTheme("canvas"), { scope: '[class*="instui"]' });
 * ```
 *
 * @example Post-process with a plugin css hook
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { tokens } from "@pantoken/tokens";
 *
 * toCss(tokens, {
 *   plugins: [
 *     {
 *       name: "focus",
 *       css: () => ({ append: ":focus-visible { outline: 2px solid var(--instui-focus-color); }" }),
 *     },
 *   ],
 * });
 * ```
 */
export function toCss(tokens: readonly Token[], options: ToCssOptions = {}): string {
  const { scope = ":root", layer, emit = "all", declareAll = false, plugins = [] } = options;

  const properties: PropertyRule[] = [];
  const declarations: [string, string][] = [];
  for (const token of tokens) {
    if (declareAll || isContextual(token.value)) declarations.push([token.name, token.value]);
    else properties.push({ name: token.name, syntax: token.syntax, value: token.value });
  }

  let css = buildCssFile({
    comments: [
      "/* Instructure design tokens + icon set (pantoken) */",
      "/* Concrete tokens are registered with @property; themed/reference tokens are declarations. */",
    ],
    scope,
    properties: emit === "declarations" ? [] : properties,
    sections: emit === "properties" ? [] : [{ layer, pairs: declarations }],
  });

  const prepends: string[] = [];
  const appends: string[] = [];
  for (const plugin of checkPlugins(plugins, "css")) {
    const c = plugin.css?.({ tokens: tokens as Token[], css });
    if (!c) continue;
    appendContribution(c, prepends, appends, { scope, emit, declareAll });
  }

  return [...prepends, css, ...appends].filter(Boolean).join("\n\n");
}

function appendContribution(
  c: CssContribution,
  prepends: string[],
  appends: string[],
  { scope, emit, declareAll }: { scope: string; emit: CssEmitTarget; declareAll: boolean },
): void {
  if (c.prepend && emit !== "properties") prepends.push(marked(c.marker, c.prepend));
  // A contextual initial-value (`var()`/`light-dark()`) can never be a valid `@property` registration,
  // so route those to declarations instead — a plugin contributing one previously emitted invalid CSS.
  const typedProps: PropertyRule[] = [];
  const declPairs: [string, string][] = [...(c.declarations ?? [])];
  for (const p of c.properties ?? []) {
    if (declareAll || isContextual(p.value)) declPairs.push([p.name, p.value]);
    else typedProps.push(p);
  }
  const extraProps =
    emit === "declarations"
      ? ""
      : typedProps
          .map(
            (p) =>
              `@property ${p.name} {\n  syntax: "${p.syntax}";\n  inherits: true;\n  initial-value: ${p.value};\n}`,
          )
          .join("\n\n");
  const emitDecls = emit !== "properties";
  const extraDecls =
    emitDecls && declPairs.length
      ? `${scope} {\n${declPairs.map(([n, v]) => `  ${n}: ${v};`).join("\n")}\n}`
      : "";
  const block = [extraProps, extraDecls, emitDecls ? c.append : ""].filter(Boolean).join("\n\n");
  if (block) appends.push(marked(c.marker, block));
}
