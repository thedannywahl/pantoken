/**
 * The `--instui-elevation-*` shadow scale — the one documented `@declaration` record whose CSS is a
 * token block on `:root` (no modifier classes). `componentsCss()` leads its sheet with `elevationCss()`
 * so the shadows components reference (modal, alert, menu) resolve from `components.css` alone, and the
 * leading {@link ELEVATION_DOC} block flows into lint + the CSS-API pages. Like {@link focus} it can't
 * use `defineDeclaration`, so it exposes the bespoke {@link elevationCss} builder plus a
 * {@link Definition}-shaped {@link elevation} object for the registry + `validate()`.
 *
 * @module
 */
import { css } from "../lib/css.ts";
import type { Definition } from "../lib/define.ts";

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

/** The elevation declaration's cssdoc doc comment (authored inline; the CSS body follows in {@link elevationCss}). */
// prettier-ignore
const ELEVATION_DOC = css`/**
 * @declaration elevation
 * @summary The \`--instui-elevation-*\` shadow scale: multi-layer \`box-shadow\` custom properties (\`resting\`, \`above\`, \`topmost\`, plus the \`depth1\`–\`depth3\`, \`card\`, and \`cardHover\` aliases) declared on \`:root\` and themed via the drop-shadow colour tokens, so shadows adapt per theme wherever a token sheet is loaded.
 * @cssproperty --instui-elevation-resting — The resting (lowest) elevation shadow.
 * @cssproperty --instui-elevation-above — The raised elevation shadow.
 * @cssproperty --instui-elevation-topmost — The highest elevation shadow, for modals and menus.
 * @cssproperty --instui-elevation-depth1 — Alias of \`resting\`.
 * @cssproperty --instui-elevation-depth2 — Alias of \`above\`.
 * @cssproperty --instui-elevation-depth3 — Alias of \`topmost\`.
 * @cssproperty --instui-elevation-card — Alias of \`resting\`, for card surfaces.
 * @cssproperty --instui-elevation-cardHover — Alias of \`topmost\`, for hovered cards.
 * @related view — The View primitive's \`-shadow-*\` modifiers read these shadows.
 * @demo self:elevation
 */`;

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

/**
 * Build the elevation token block: `<selector> { --instui-elevation-*: … }`. Shipped inside
 * `components.css` (so shadows are intrinsic — no plugin, no extra import), and reusable by other
 * layered outputs (e.g. the Pendo renderer) via the `selector` option.
 *
 * @param options - `selector` — the rule selector (default `:root`).
 * @returns The CSS string.
 *
 * @example
 * ```ts
 * import { elevationCss } from "@pantoken/components";
 *
 * elevationCss(); // ":root { --instui-elevation-resting: …; --instui-elevation-above: …; … }"
 * ```
 *
 * @demo self:elevation
 */
export function elevationCss(options: { selector?: string } = {}): string {
  const selector = options.selector ?? ":root";
  const body = elevationDeclarations()
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
  // prettier-ignore
  return css`${ELEVATION_DOC}\n${selector} {\n${body}\n}\n`;
}

/**
 * The {@link Definition}-shaped view of the elevation declaration, so it can sit in the DECLARATIONS
 * registry and be checked by `validate()`. `css()`/`rules()` delegate to {@link elevationCss} (its
 * default `:root` output is a single well-formed declaration record).
 */
export const elevation: Definition = {
  name: "elevation",
  kind: "declaration",
  rules: () => elevationCss(),
  css: () => elevationCss(),
};
