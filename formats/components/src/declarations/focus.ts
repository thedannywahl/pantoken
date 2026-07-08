/**
 * The focus-outline system — the InstUI focus ring, intrinsic to `base.css` so every focusable gets it
 * out of the box when pantoken owns the page. The resting element carries a transparent ring + a
 * transition, and `:focus-visible` reveals the colour and grows the offset. All rules are
 * zero-specificity `:where()`, so any component style overrides without `!important`.
 *
 * This is the one documented `@declaration` record, but it can't use `defineDeclaration` (its CSS is a
 * token block on one selector plus ring rules on another). Instead it exposes {@link focusOutlineCss}
 * (the bespoke builder `base.css` calls directly) and a {@link Definition}-shaped {@link focus} object
 * so the registry + `validate()` can treat it uniformly.
 *
 * @module
 */
import type { Definition } from "../lib/define.ts";
import { renderDocBlock, type RecordMeta } from "../lib/record.ts";

/** The elements the ring applies to by default (the common interactive/focusable elements). */
export const FOCUSABLE_SELECTOR = "a, button, input, select, textarea, summary, [tabindex]";

const focusShared = (name: string): string =>
  `var(--instui-component-shared-tokens-focus-outline-${name})`;

/**
 * The `--instui-focus-outline-*` name/value pairs the ring rules read. Colour/width/offset reference
 * the themed shared focus tokens; the transition, line style, and inset are constants.
 *
 * @returns One `[customProperty, value]` pair per focus-ring variable.
 */
export function focusOutlineDeclarations(): [name: string, value: string][] {
  return [
    ["--instui-focus-outline-color", focusShared("info-color")],
    ["--instui-focus-outline-color-start", "transparent"],
    ["--instui-focus-outline-width", focusShared("width")],
    ["--instui-focus-outline-offset", focusShared("offset")],
    ["--instui-focus-outline-radius", "var(--instui-border-radius-md)"],
    ["--instui-focus-outline-style", "solid"],
    ["--instui-focus-outline-transition", "outline-color 0.2s, outline-offset 0.25s"],
    ["--instui-focus-outline-color-success", focusShared("success-color")],
    ["--instui-focus-outline-color-danger", focusShared("danger-color")],
    ["--instui-focus-outline-color-inverse", focusShared("on-color")],
    ["--instui-focus-outline-inset", "0rem"],
  ];
}

/**
 * The focus-ring rules for a given focusable selector: a transparent resting ring that transitions in
 * on `:focus-visible`, plus the `-focus-color-*` / `-focus-position-inset` / `-focus-within` /
 * `-without-focus-animation` modifiers. All `:where()`-wrapped, so zero-specificity.
 *
 * @param selector - The focusable selector the base ring applies to (default {@link FOCUSABLE_SELECTOR}).
 * @returns The CSS rules string.
 */
export function focusOutlineRules(selector: string = FOCUSABLE_SELECTOR): string {
  return [
    `:where(${selector}) {`,
    `  outline: var(--instui-focus-outline-width) var(--instui-focus-outline-style) var(--instui-focus-outline-color-start);`,
    `  outline-offset: 0;`,
    `  transition: var(--instui-focus-outline-transition);`,
    `}`,
    `:where(${selector}):where(:focus-visible) {`,
    `  outline-color: var(--instui-focus-outline-color);`,
    `  outline-offset: var(--instui-focus-outline-offset);`,
    `  border-radius: var(--instui-focus-outline-radius);`,
    `}`,
    `:where(.-focus-color-success):where(:focus-visible) { outline-color: var(--instui-focus-outline-color-success); }`,
    `:where(.-focus-color-danger):where(:focus-visible) { outline-color: var(--instui-focus-outline-color-danger); }`,
    `:where(.-focus-color-inverse):where(:focus-visible) { outline-color: var(--instui-focus-outline-color-inverse); }`,
    `:where(.-focus-position-inset):where(:focus-visible) { outline-offset: var(--instui-focus-outline-inset); }`,
    `:where(.-focus-within):where(:focus-within) {`,
    `  outline-color: var(--instui-focus-outline-color);`,
    `  outline-offset: var(--instui-focus-outline-offset);`,
    `  border-radius: var(--instui-focus-outline-radius);`,
    `}`,
    `:where(.-without-focus-animation) { transition: none; }`,
  ].join("\n");
}

/** The focus declaration's doc-block metadata (rendered by {@link renderDocBlock}). */
const focusMeta: RecordMeta = {
  kind: "declaration",
  name: "focus",
  className: ":focus-visible",
  summary:
    "The focus-outline system: the `--instui-focus-outline-*` custom properties (declared on `:root`) plus the `:focus-visible` ring every focusable gets, and opt-in tuning classes.",
  modifiers: [
    { name: "-focus-color-success", description: "Success-coloured ring." },
    { name: "-focus-color-danger", description: "Danger-coloured ring." },
    { name: "-focus-color-inverse", description: "Inverse (on-dark) ring." },
    {
      name: "-focus-position-inset",
      description: "Draw the ring inset, inside the element's edge.",
    },
    { name: "-focus-within", description: "Ring the element while a descendant is focused." },
    { name: "-without-focus-animation", description: "Disable the ring's grow-in animation." },
  ],
  examples: ['<button class="instui-button -focus-color-danger">Delete</button>'],
  demo: "self:focus-outline",
};

/**
 * Build the focus-outline block: the `--instui-focus-outline-*` token defs plus the ring rules.
 * Baked into `base.css` (so focusables get the ring out of the box), and reusable by other layered
 * outputs (e.g. the Pendo renderer) via the `selector`/`tokenSelector` options.
 *
 * @param options - `selector` — the focusable selector; `tokenSelector` — where the token defs land
 *   (default `:where(:root)`).
 * @returns The CSS string.
 *
 * @demo self:focus-outline
 */
export function focusOutlineCss(
  options: { selector?: string; tokenSelector?: string } = {},
): string {
  const tokenSelector = options.tokenSelector ?? ":where(:root)";
  const decls = focusOutlineDeclarations()
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  return `${renderDocBlock(focusMeta)}\n${tokenSelector} {\n${decls}\n}\n\n${focusOutlineRules(options.selector)}\n`;
}

/**
 * The {@link Definition}-shaped view of the focus declaration, so it can sit in the DECLARATIONS
 * registry and be checked by `validate()`. `css()`/`rules()` delegate to {@link focusOutlineCss} (its
 * default `instui`-prefixed output is a single well-formed declaration record).
 */
export const focus: Definition = {
  name: "focus",
  kind: "declaration",
  meta: focusMeta,
  rules: () => focusOutlineCss(),
  css: () => focusOutlineCss(),
};
