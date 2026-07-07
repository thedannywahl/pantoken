/**
 * `@pantoken/plugin-focus-outline` — inject the InstUI focus-outline ring, which isn't captured in
 * the source tokens.
 *
 * The ring animates the way InstUI's does: the resting element carries a transparent outline plus a
 * transition, and `:focus-visible` reveals the colour and grows the offset (outline-color 0.2s,
 * outline-offset 0.25s). Values default to InstUI's shared focus-outline tokens, but the plugin
 * **resolves those references to concrete leaf values** against the caller's IR layered over the
 * chosen theme's shipped IR (`theme` option, default `rebrand`) — so it works in any output (CSS,
 * Swift, …) with nothing left dangling, and the values track the tokens if they change upstream (no
 * hardcoded fallbacks). The active state uses `:where(…):where(:focus-visible)` so the ring is
 * zero-specificity — a resettable default any component style can override without `!important`.
 *
 * The plugin defines *both* a `tokens` hook and a `css` hook, so the consumer chooses the layer: add
 * it to `buildTokens` to bake resolved `--instui-focus-outline-*` records into every output, or add
 * it to `toCss` (the css hook self-defines those custom properties, so the rules stand alone). Same
 * plugin, either layer.
 *
 * @module
 */
import { definePlugin, makeResolver } from "@pantoken/plugin-kit";
import { byTheme } from "@pantoken/tokens";
import type { PantokenPlugin, Theme, Token, TokenInput } from "@pantoken/model";

/** The elements the ring applies to when no `selector` is given. */
const DEFAULT_SELECTOR = "a, button, input, select, textarea, summary, [tabindex]";

/** Options for the {@link focusOutline} plugin. */
export interface FocusOutlineOptions {
  /** The visible ring colour (default: `var(--instui-component-shared-tokens-focus-outline-info-color)`). */
  color?: string;
  /** The resting (transition-start) colour the ring fades in from (default: `transparent`). */
  colorStart?: string;
  /** The ring width (default: `var(--instui-component-shared-tokens-focus-outline-width)`). */
  width?: string;
  /** The focused ring offset (default: `var(--instui-component-shared-tokens-focus-outline-offset)`). */
  offset?: string;
  /**
   * The ring corner radius, applied on focus so the outline rounds even on elements without a radius
   * of their own (e.g. links). Default: `var(--instui-border-radius-md)`. Elements with their own
   * radius keep it — the ring rule is zero-specificity.
   */
  radius?: string;
  /** The ring line style (default: `var(--instui-component-shared-tokens-focus-outline-style)`). */
  style?: string;
  /** The `outline-color` transition duration (default: `0.2s`). */
  transitionColor?: string;
  /** The `outline-offset` transition duration (default: `0.25s`). */
  transitionOffset?: string;
  /** The base element selector the ring applies to (default: common interactive elements). */
  selector?: string;
  /**
   * The theme whose shipped IR seeds reference resolution. Overrides the theme being built; when
   * omitted, the `tokens` hook adopts `ctx.theme` and the `css` hook falls back to `"rebrand"`.
   */
  theme?: Theme;
  /**
   * Where the CSS-hook rules land relative to the stylesheet: `"append"` (default) after it, or
   * `"prepend"` before it — useful when you want the ring as a low-priority baseline that later
   * rules override on ties.
   */
  position?: "append" | "prepend";
}

/**
 * Create the focus-outline ring plugin.
 *
 * @param options - {@link FocusOutlineOptions}.
 * @returns A {@link PantokenPlugin} with `tokens` and `css` hooks.
 *
 * @example Inject only the CSS rules through toCss
 * ```ts
 * import { toCss } from "@pantoken/css";
 * import { byTheme } from "@pantoken/tokens";
 * import { focusOutline } from "@pantoken/plugin-focus-outline";
 *
 * const css = toCss(byTheme("rebrand"), { plugins: [focusOutline()] });
 * // appends a resting rule and an active :where(…):where(:focus-visible) rule
 * ```
 *
 * @example Bake resolved focus-outline tokens into every output
 * ```ts
 * import { buildTokens } from "@pantoken/core";
 * import { focusOutline } from "@pantoken/plugin-focus-outline";
 *
 * buildTokens({ theme: "rebrand", plugins: [focusOutline()] });
 * // adds --instui-focus-outline-color / -width / -offset / … to the IR
 * ```
 *
 * @example Customize the ring and scope it to a selector
 * ```ts
 * import { focusOutline } from "@pantoken/plugin-focus-outline";
 *
 * focusOutline({
 *   selector: ".btn, .link",
 *   offset: "3px",
 *   position: "prepend",
 * });
 * ```
 */
export function focusOutline(options: FocusOutlineOptions = {}): PantokenPlugin {
  const raw = {
    color: options.color ?? "var(--instui-component-shared-tokens-focus-outline-info-color)",
    colorStart: options.colorStart ?? "transparent",
    width: options.width ?? "var(--instui-component-shared-tokens-focus-outline-width)",
    offset: options.offset ?? "var(--instui-component-shared-tokens-focus-outline-offset)",
    radius: options.radius ?? "var(--instui-border-radius-md)",
    style: options.style ?? "var(--instui-component-shared-tokens-focus-outline-style)",
    transitionColor: options.transitionColor ?? "0.2s",
    transitionOffset: options.transitionOffset ?? "0.25s",
  };
  const selector = options.selector ?? DEFAULT_SELECTOR;
  const position = options.position ?? "append";

  /** Resolve every value to a concrete leaf against the caller's IR + the theme's shipped base. */
  function definitions(tokens: readonly Token[], theme: Theme): TokenInput[] {
    const resolve = makeResolver(byTheme(theme), { overrides: tokens });
    const transitionColor = resolve(raw.transitionColor);
    const transitionOffset = resolve(raw.transitionOffset);
    return [
      { name: "--instui-focus-outline-color", value: resolve(raw.color) },
      { name: "--instui-focus-outline-color-start", value: resolve(raw.colorStart) },
      { name: "--instui-focus-outline-width", value: resolve(raw.width) },
      { name: "--instui-focus-outline-offset", value: resolve(raw.offset) },
      { name: "--instui-focus-outline-radius", value: resolve(raw.radius) },
      { name: "--instui-focus-outline-style", value: resolve(raw.style) },
      { name: "--instui-focus-outline-transition-color", value: transitionColor },
      { name: "--instui-focus-outline-transition-offset", value: transitionOffset },
      // A ready-made shorthand for the `transition` property (concrete, so nothing dangles).
      {
        name: "--instui-focus-outline-transition",
        value: `outline-color ${transitionColor}, outline-offset ${transitionOffset}`,
      },
      // The `focusColor` palette + the `focusPosition="inset"` offset, resolved so the variant rules
      // below stand alone in the css-hook output too.
      {
        name: "--instui-focus-outline-color-success",
        value: resolve("var(--instui-component-shared-tokens-focus-outline-success-color)"),
      },
      {
        name: "--instui-focus-outline-color-danger",
        value: resolve("var(--instui-component-shared-tokens-focus-outline-danger-color)"),
      },
      {
        name: "--instui-focus-outline-color-inverse",
        value: resolve("var(--instui-component-shared-tokens-focus-outline-on-color)"),
      },
      {
        name: "--instui-focus-outline-inset",
        value: resolve("var(--instui-component-shared-tokens-focus-outline-inset)"),
      },
    ];
  }

  const rules = [
    // Resting: a transparent ring, ready to transition in.
    `:where(${selector}) {`,
    `  outline: var(--instui-focus-outline-width) var(--instui-focus-outline-style) var(--instui-focus-outline-color-start);`,
    `  outline-offset: 0;`,
    `  transition: var(--instui-focus-outline-transition);`,
    `}`,
    ``,
    // Active: reveal the colour, grow the offset, and round the ring (the outline follows the
    // element's radius, so this rounds links and other elements that carry none). Zero-specificity
    // via :where(), so an element's own radius still wins.
    `:where(${selector}):where(:focus-visible) {`,
    `  outline-color: var(--instui-focus-outline-color);`,
    `  outline-offset: var(--instui-focus-outline-offset);`,
    `  border-radius: var(--instui-focus-outline-radius);`,
    `}`,
    ``,
    // focusColor: recolour the ring (default is info). Dash-prefixed modifiers, zero-specificity.
    `:where(.-focus-color-success):where(:focus-visible) { outline-color: var(--instui-focus-outline-color-success); }`,
    `:where(.-focus-color-danger):where(:focus-visible) { outline-color: var(--instui-focus-outline-color-danger); }`,
    `:where(.-focus-color-inverse):where(:focus-visible) { outline-color: var(--instui-focus-outline-color-inverse); }`,
    ``,
    // focusPosition: draw the ring inside the element's edge instead of outside.
    `:where(.-focus-position-inset):where(:focus-visible) { outline-offset: var(--instui-focus-outline-inset); }`,
    ``,
    // focusWithin: reveal the ring when a descendant is focused (not just the element itself).
    `:where(.-focus-within):where(:focus-within) {`,
    `  outline-color: var(--instui-focus-outline-color);`,
    `  outline-offset: var(--instui-focus-outline-offset);`,
    `  border-radius: var(--instui-focus-outline-radius);`,
    `}`,
    ``,
    // shouldAnimateFocus={false}: the ring snaps in with no transition (animation is on by default).
    `:where(.-without-focus-animation) { transition: none; }`,
  ].join("\n");

  return definePlugin({
    name: "@pantoken/plugin-focus-outline",
    // The explicit `theme` option wins; otherwise adopt the theme being built (`ctx.theme`).
    tokens: ({ tokens, theme, define }) => [
      ...tokens,
      ...definitions(tokens, options.theme ?? theme).map((d) => define(d)),
    ],
    css: ({ tokens }) => {
      // The css hook has no theme in context, so fall back to the option (default "rebrand").
      const present = new Set(tokens.map((t) => t.name));
      const declarations = definitions(tokens, options.theme ?? "rebrand")
        .filter((d) => !present.has(d.name))
        .map((d): [string, string] => [d.name, d.value]);
      return {
        marker: "pantoken:focus-outline",
        ...(declarations.length ? { declarations } : {}),
        [position]: rules,
      };
    },
  });
}

export default focusOutline;
