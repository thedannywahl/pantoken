/**
 * The two composite custom-property systems that sit *below* the component library but *above* the raw
 * token IR: the `--instui-elevation-*` shadow scale and the `--instui-focus-outline-*` ring variables
 * (plus the zero-specificity `:focus-visible` ring rules). They're bespoke composites — hardcoded
 * geometry/constants combined with themed token references — so they can't be plain IR tokens, yet both
 * `@pantoken/css` (which emits them into the token sheet) and `@pantoken/components` (which documents
 * them as `@declaration` records and reuses them for the base/pendo sheets) need them. Keeping them here,
 * in the shared upstream-free helpers package, lets `@pantoken/css` own the emission without an upward
 * dependency on `@pantoken/components`.
 *
 * These are pure string builders — no Node imports, no cssdoc/`Definition` concerns — so the
 * browser-facing graphs that pull them in stay Node-free.
 *
 * @module
 */

// ── Elevation ─────────────────────────────────────────────────────────────────────────────────────

/** Per-level geometry (`offset-x offset-y blur`) for the [tighter, wider] shadow layers. */
const ELEVATION_GEOMETRY: Record<string, [tight: string, wide: string]> = {
  resting: ["0 0.0625rem 0.125rem", "0 0.0625rem 0.1875rem"],
  above: ["0 0.1875rem 0.375rem", "0 0.1875rem 0.375rem"],
  topmost: ["0 0.375rem 0.4375rem", "0 0.625rem 1.75rem"],
};

/** Aliases InstUI ships alongside the primary level names. */
const ELEVATION_ALIASES: Record<string, keyof typeof ELEVATION_GEOMETRY> = {
  depth1: "resting",
  depth2: "above",
  depth3: "topmost",
  card: "resting",
  cardHover: "topmost",
};

/**
 * Every elevation level and alias emitted as `--instui-elevation-<name>` (`resting`, `above`,
 * `topmost`, `depth1`–`depth3`, `card`, `cardHover`). Derived from the geometry + alias maps.
 */
export const ELEVATION_NAMES: readonly string[] = [
  ...Object.keys(ELEVATION_GEOMETRY),
  ...Object.keys(ELEVATION_ALIASES),
];

// The tighter layer takes the softer colour, the wider layer the stronger one — InstUI's "lifted" look.
const ELEVATION_COLOR_STRONG = "var(--instui-color-drop-shadow-shadow-color1)";
const ELEVATION_COLOR_SOFT = "var(--instui-color-drop-shadow-shadow-color2)";
const elevationShadow = ([tight, wide]: [string, string]): string =>
  `${tight} ${ELEVATION_COLOR_SOFT}, ${wide} ${ELEVATION_COLOR_STRONG}`;

/**
 * The `--instui-elevation-*` name/value pairs (each a multi-layer `box-shadow`). Values reference the
 * themed drop-shadow colour tokens, so they adapt per theme wherever a token sheet is loaded.
 *
 * @returns One `[customProperty, value]` pair per level and alias.
 *
 * @example
 * ```ts
 * import { elevationDeclarations } from "@pantoken/utils";
 *
 * elevationDeclarations(); // [["--instui-elevation-resting", "…"], ["--instui-elevation-above", "…"], …]
 * ```
 */
export function elevationDeclarations(): [name: string, value: string][] {
  const levels: [string, [string, string]][] = [
    ...Object.entries(ELEVATION_GEOMETRY),
    ...Object.entries(ELEVATION_ALIASES).map(([alias, base]): [string, [string, string]] => [
      alias,
      ELEVATION_GEOMETRY[base],
    ]),
  ];
  return levels.map(([name, geo]) => [`--instui-elevation-${name}`, elevationShadow(geo)]);
}

// ── Focus outline ───────────────────────────────────────────────────────────────────────────────

/** The elements the ring applies to by default (the common interactive/focusable elements). */
export const FOCUSABLE_SELECTOR = "a, button, input, select, textarea, summary, [tabindex]";

const focusShared = (name: string): string =>
  `var(--instui-component-shared-tokens-focus-outline-${name})`;

/**
 * The `--instui-focus-outline-*` name/value pairs the ring rules read. Colour/width/offset reference
 * the themed shared focus tokens; the transition, line style, and inset are constants.
 *
 * @returns One `[customProperty, value]` pair per focus-ring variable.
 *
 * @example
 * ```ts
 * import { focusOutlineDeclarations } from "@pantoken/utils";
 *
 * focusOutlineDeclarations(); // [["--instui-focus-outline-color", "…"], …]
 * ```
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
