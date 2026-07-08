/**
 * Shared primitives for the component builders: the class-prefix namespace helper, the `@scope`
 * wrapper, the standalone-sheet `wrap` header, the masked-glyph constants, and the spacing scales.
 * These carry no per-record content — every `src/{components,utilities,rules,declarations}` module
 * imports what it needs from here.
 *
 * @module
 */

/** The default class prefix (`instui` → `.instui-button`). */
export const DEFAULT_PREFIX = "instui";

/** Options common to every builder. */
export interface ComponentOptions {
  /**
   * The class prefix. A truthy string namespaces every class (`"instui"` → `.instui-button`); any
   * falsy value (`null`, `undefined`, `""`, or omitting the option) drops the prefix entirely
   * (`.button`), so you can author `class="heading -h1"`. The stylesheets shipped by this package are
   * built with `"instui"`.
   */
  prefix?: string | null;
}

/** Join a class prefix to its separator: `"instui"` → `"instui-"`; a falsy prefix → `""` (no prefix). */
export const ns = (prefix: string | null | undefined): string => (prefix ? `${prefix}-` : "");

/**
 * Wrap a component's element rules in an `@scope` at-rule rooted at the component, so its bare element
 * classes (`.item`, `.tab`) only take effect inside that component's subtree. Author `body` with the
 * component's own token — `${root}` for the root and `${root} .el` for a descendant element — and this
 * rewrites the root away: `${root} .el` → `.el` (bare, implicitly scoped), `${root}.-mod` →
 * `:scope.-mod` (root modifier), and any remaining `${root}` → `:scope`.
 *
 * `children` names the elements that are DIRECT children of the scope root; each is upgraded to the
 * RSCSS child combinator (`.el` → `:scope > .el`, `:scope.-mod .el` → `:scope.-mod > .el`) so a
 * consumer's same-named element nested DEEPER inside the component no longer matches. Omit an element
 * (leave it descendant) when its DOM parent is unclassed or variable — e.g. tabs `.tab` sits under
 * `.list`, byline `.title`/`.description` under an unclassed wrapper.
 *
 * Two rules for callers: (1) pass ONLY element rules — keep the root and root-modifier-only rules
 * (esp. `-size-*`, which the size-alias post-processor rewrites) OUTSIDE, prefixed, so their aliases
 * stay valid; (2) never pass a body whose root token is a prefix of a sibling class (e.g.
 * `.instui-progress` vs `.instui-progress-value`) — split those out first.
 */
export const scope = (root: string, body: string, children: string[] = []): string => {
  let scoped = body
    .split(`${root} .`)
    .join(".")
    .split(`${root}.`)
    .join(":scope.")
    .split(`${root} `)
    .join(":scope ")
    .split(root)
    .join(":scope");
  for (const c of children) {
    // Direct child of the root: a bare `.c` starting a selector → `:scope > .c`.
    scoped = scoped.replace(
      new RegExp(`(^|[\\n,])(\\s*)\\.${c}(?![\\w-])`, "g"),
      `$1$2:scope > .${c}`,
    );
    // Direct child of a modified root: `:scope<mods> .c` → `:scope<mods> > .c`.
    scoped = scoped.replace(new RegExp(`(:scope[^ ,{\\n]*) \\.${c}(?![\\w-])`, "g"), `$1 > .${c}`);
  }
  return `@scope (${root}) {\n${scoped}\n}`;
};

/** Prepend the standalone-sheet header comment to a rules string (used by each exported `xxxCss`). */
export const wrap = (name: string, prefix: string, rules: string): string =>
  `/* InstUI ${name} (@pantoken/components) — prefix: ${prefix} */\n${rules.trim()}\n`;

// ── Masked-glyph constants ─────────────────────────────────────────────────────
/**
 * A contained, centred mask value pointing at a shared `--instui-icon-<name>` token, painted via
 * `background` (so the glyph takes the element's colour). Masks only — the token's `stroke=currentColor`
 * is irrelevant since the alpha channel drives the mask. Painting a glyph as a `background-image`
 * (which can't read `currentColor`) still needs a colour-baked data URI: see {@link SELECT_CHEVRON} /
 * {@link CHECK_URL_ON}.
 */
export const iconMask = (name: string): string =>
  `var(--instui-icon-${name}) center / contain no-repeat`;

/** Lucide `x`, for the CloseButton glyph. */
export const CLOSE_ICON = iconMask("x");
/** Lucide `check`, for the Checkbox tick. */
export const CHECK_ICON = iconMask("check");
/** Lucide `minus`, masked, for the Checkbox indeterminate (mixed) state. */
export const MINUS_ICON = iconMask("minus");
/** Lucide `circle-alert`, masked — the FormFieldMessage error glyph (painted in `currentColor`). */
export const ALERT_CIRCLE_ICON = iconMask("circle-alert");
/** Lucide `circle-check`, masked — the FormFieldMessage success glyph (painted in `currentColor`). */
export const CHECK_CIRCLE_ICON = iconMask("circle-check");

/** Lucide `chevron-down` in the InstUI icon grey — the SimpleSelect caret. A native `<select>` is a
 *  replaced element (no pseudo-elements), so the caret is a `background-image`, not `::after`; a data-URI
 *  background can't read `currentColor`, so the stroke is a fixed neutral grey that reads in both modes. */
export const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236a7883' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

/** Lucide `check` stroked white — the customizable-select selected-option glyph (on the action fill;
 *  a background-image can't read currentColor, and the selected fill is a saturated action colour that
 *  pairs with the on-colour white check). */
export const CHECK_URL_ON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E\")";

/** Lucide `chevron-up`/`chevron-down`, masked — the NumberInput spinner glyphs (painted in currentColor). */
export const CHEVRON_UP_ICON = iconMask("chevron-up");
export const CHEVRON_DOWN_ICON = iconMask("chevron-down");
/** Lucide `chevron-right`, masked — the ToggleDetails/ToggleGroup disclosure marker (rotates on [open]). */
export const CHEVRON_RIGHT_ICON = iconMask("chevron-right");

/**
 * InstUI's `ai` glyph (Solid), inlined as a mask so it paints in the button's own colour — solid
 * white on `--ai`, the violet→sea gradient on `--ai-secondary`. Source: `@instructure/ui-icons`.
 */
export const AI_ICON_MASK =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1920 1920' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M960 0L1219.29 700.713L1920 960L1219.29 1219.29L960 1920L700.713 1219.29L0 960L700.713 700.713L960 0Z'/%3E%3Cpath d='M1600 0L1686.43 233.571L1920 320L1686.43 406.429L1600 640L1513.57 406.429L1280 320L1513.57 233.571L1600 0Z'/%3E%3C/svg%3E\") center / contain no-repeat";

// ── Spacing scales ─────────────────────────────────────────────────────────────
/** Spacing step → value on the pantoken spacing scale. */
export const SPACING_STEPS: Record<string, string> = {
  "0": "0",
  "2xs": "var(--instui-spacing-space2xs)",
  xs: "var(--instui-spacing-space-xs)",
  sm: "var(--instui-spacing-space-sm)",
  md: "var(--instui-spacing-space-md)",
  lg: "var(--instui-spacing-space-lg)",
  xl: "var(--instui-spacing-space-xl)",
  "2xl": "var(--instui-spacing-space2xl)",
};

/** Logical sides (RTL-safe): key → the property suffix appended to `margin`/`padding`. */
export const SPACING_SIDES: Record<string, string> = {
  "": "",
  t: "-block-start",
  b: "-block-end",
  s: "-inline-start",
  e: "-inline-end",
  x: "-inline",
  y: "-block",
};
