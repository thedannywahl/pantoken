/**
 * The `--instui-elevation-*` shadow scale. Helpers only — NOT a documented record and not in any
 * registry: `componentsCss()` leads its sheet with `elevationCss()` so the shadows components
 * reference (modal, alert, menu) resolve from `components.css` alone.
 *
 * @module
 */

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
  return `${selector} {\n${body}\n}\n`;
}
