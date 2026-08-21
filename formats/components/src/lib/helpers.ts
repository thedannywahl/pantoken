/**
 * Shared primitives for the component builders: the class-prefix namespace helper, the standalone-sheet
 * `wrap` header, the masked-glyph constants, and the spacing scales. These carry no per-record content —
 * every `src/{components,utilities,rules,declarations}` module imports what it needs from here.
 *
 * @module
 */
import {
  SPACING_AUTO_STEP as SHARED_SPACING_AUTO_STEP,
  SPACING_STEPS as SHARED_SPACING_STEPS,
} from "@pantoken/utils";
import type { SpacingStep } from "@pantoken/utils";

export type { SpacingStep };

/** The default class prefix (`instui` → `.instui-button`). */
export const DEFAULT_PREFIX = "instui";

/** Theme keys emitted by `@pantoken/tokens`. */
export type ComponentTheme = "rebrand" | "canvas" | "canvasHighContrast";

/** Options common to every builder. */
export interface ComponentOptions {
  /**
   * The class prefix. A truthy string namespaces every class (`"instui"` → `.instui-button`); any
   * falsy value (`null`, `undefined`, `""`, or omitting the option) drops the prefix entirely
   * (`.button`), so you can author `class="heading -h1"`. The stylesheets shipped by this package are
   * built with `"instui"`.
   */
  prefix?: string | null;
  /**
   * Target theme for emitted CSS. Defaults to `"rebrand"` when omitted.
   */
  theme?: ComponentTheme;
}

/** Join a class prefix to its separator: `"instui"` → `"instui-"`; a falsy prefix → `""` (no prefix). */
export const ns = (prefix: string | null | undefined): string => (prefix ? `${prefix}-` : "");

/** Prepend the standalone-sheet header comment to a rules string (used by each exported `xxxCss`). */
export const wrap = (name: string, prefix: string, rules: string): string =>
  `/* InstUI ${name} (@pantoken/components) — prefix: ${prefix} */\n${rules.trim()}\n`;

/**
 * Emit the three utility selector variants from one canonical modifier token:
 * 1) namespaced utility class + modifier,
 * 2) namespaced bare modifier,
 * 3) bare modifier (or an override for legacy shapes).
 */
const utilityVariantSelectors = (
  baseClass: string,
  namespace: string,
  modifier: string,
  bareSelector: string = modifier,
): [string, string, string] => [
  `${baseClass}${modifier}`,
  `.-${namespace}${modifier}`,
  bareSelector,
];

/** Emit one CSS rule from utility selector variants plus a declaration body. */
export const utilityVariantRule = (
  baseClass: string,
  namespace: string,
  modifier: string,
  declaration: string,
  bareSelector?: string,
): string =>
  `${utilityVariantSelectors(baseClass, namespace, modifier, bareSelector).join(", ")} { ${declaration}; }`;

// ── Masked-glyph constants ─────────────────────────────────────────────────────
/**
 * A contained, centred mask value pointing at a shared `--instui-icon-<name>` token, painted via
 * `background` (so the glyph takes the element's colour). Masks only — the token's `stroke=currentColor`
 * is irrelevant since the alpha channel drives the mask. Painting a glyph as a `background-image`
 * (which can't read `currentColor`) still needs a colour-baked data URI: see {@link SELECT_CHEVRON}.
 *
 * Only the glyphs still consumed by the TypeScript-authored records (button, the input controls) live
 * here now; the migrated `.css` records inline their `var(--instui-icon-*)` masks directly.
 */
const iconMask = (name: string): string => `var(--instui-icon-${name}) center / contain no-repeat`;

/** Lucide `chevron-down` in the InstUI icon grey — the SimpleSelect caret. A native `<select>` is a
 *  replaced element (no pseudo-elements), so the caret is a `background-image`, not `::after`; a data-URI
 *  background can't read `currentColor`, so the stroke is a fixed neutral grey that reads in both modes. */
export const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236a7883' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

/** Lucide `chevron-up`/`chevron-down`, masked — the NumberInput spinner glyphs (painted in currentColor). */
export const CHEVRON_UP_ICON: string = iconMask("chevron-up");
/** Lucide `chevron-down`, masked — the NumberInput down spinner glyph (painted in currentColor). */
export const CHEVRON_DOWN_ICON: string = iconMask("chevron-down");

/**
 * InstUI's `ai` glyph (Solid), inlined as a mask so it paints in the button's own colour — solid
 * white on `--ai`, the violet→sea gradient on `--ai-secondary`. Source: `@instructure/ui-icons`.
 */
export const AI_ICON_MASK =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1920 1920' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M960 0L1219.29 700.713L1920 960L1219.29 1219.29L960 1920L700.713 1219.29L0 960L700.713 700.713L960 0Z'/%3E%3Cpath d='M1600 0L1686.43 233.571L1920 320L1686.43 406.429L1600 640L1513.57 406.429L1280 320L1513.57 233.571L1600 0Z'/%3E%3C/svg%3E\") center / contain no-repeat";

// ── Progress custom properties ─────────────────────────────────────────────────
/**
 * `@property` registrations for the numeric progress inputs (`--value`/`--min`/`--max` plus their
 * deprecated `--value-now`/`--value-max` aliases) shared verbatim by progress-bar and progress-circle,
 * so both standalone stylesheets register them without duplicating the block in each `.css` source.
 * Prefix-independent — custom property names aren't namespaced.
 */
export const PROGRESS_NUMERIC_PROPERTIES = `@property --value {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

@property --value-now {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

@property --min {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

@property --max {
  syntax: "<number>";
  inherits: true;
  initial-value: 100;
}

@property --value-max {
  syntax: "<number>";
  inherits: true;
  initial-value: 100;
}`;

// ── Spacing scales ─────────────────────────────────────────────────────────────
/** The pantoken spacing scale (short/long spellings share one CSS value) — re-exported from `@pantoken/utils`. */
export const SPACING_STEPS: readonly SpacingStep[] = SHARED_SPACING_STEPS;

/** The `auto` step — margin only, spelled the same both ways. */
export const SPACING_AUTO_STEP: SpacingStep = SHARED_SPACING_AUTO_STEP;

/** One logical side: short/long keys plus the CSS logical-property suffix (RTL-safe). */
export interface SpacingSide {
  /** Short side key (`""` for "all sides"). */
  short: string;
  /** Long, word-spelled side key (`""` for "all sides"). */
  long: string;
  /** The logical property suffix appended after `margin`/`padding`/`gap`. */
  suffix: string;
}

/** The logical sides (RTL-safe), short + long spellings sharing one CSS suffix. */
export const SPACING_SIDES: readonly SpacingSide[] = [
  { short: "", long: "", suffix: "" },
  { short: "t", long: "top", suffix: "-block-start" },
  { short: "b", long: "bottom", suffix: "-block-end" },
  { short: "s", long: "start", suffix: "-inline-start" },
  { short: "e", long: "end", suffix: "-inline-end" },
  { short: "x", long: "inline", suffix: "-inline" },
  { short: "y", long: "block", suffix: "-block" },
];

/** One boxed CSS property: short/long class-name spellings for the real CSS property. */
export interface SpacingProperty {
  /** The real CSS property (`margin`/`padding`). */
  css: "margin" | "padding";
  /** The short class-name spelling (e.g. `"m"`). */
  short: string;
  /** The long, word-spelled class-name spelling (e.g. `"margin"`). */
  long: string;
}

/** The two boxed properties the spacing utility generates classes for. */
export const SPACING_PROPERTIES: readonly SpacingProperty[] = [
  { css: "margin", short: "m", long: "margin" },
  { css: "padding", short: "p", long: "padding" },
];
