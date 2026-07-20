/**
 * Build the docs-only multi-theme component stylesheet.
 *
 * The docs switch themes at RUNTIME by toggling `<html data-pantoken-theme="…">` (see
 * `.vitepress/theme/theme.ts`), while `@pantoken/components` emits CONCRETE single-theme CSS: the
 * `themeCustomMedia` plugin lowers each `@media (--theme-*)` branch away at build time, so the shipped
 * `components.css` is the rebrand variant with the canvas/canvasHighContrast rules pruned out. A theme
 * rule that changes which TOKEN a property references (e.g. billboard's `-clickable:hover` border-color:
 * `--instui-color-text-base` → `--instui-component-link-text-color`) can't be recovered by re-scoping
 * token VALUES alone, so those overrides never appear when the reader switches themes.
 *
 * This mirrors what `scripts/site-themes.ts` does for token values, but for component RULES: emit the
 * rebrand rules unscoped, then the canvas / canvasHighContrast rules scoped under
 * `:root[data-pantoken-theme="…"]` so the same attribute toggle activates them. Both the inline
 * `@example` previews and the embedded `/play` demos load this one sheet, so both respond to the switch.
 *
 * Because `themeCustomMedia` never resolves `var()`, `componentsCss({ theme })` differs from the rebrand
 * aggregate ONLY by the presence of theme-media-derived rules. Diffing the two at rule granularity
 * yields exactly the theme-only overrides — already prefix-applied, alias-correct, and in concat order.
 */
import postcss from "postcss";
// Import from the components SOURCE barrel, not the `@pantoken/components` package specifier (which
// resolves to `dist/index.mjs`). During `vpr docs:dev` the components `dist` is only rebuilt by
// `vp pack`, which can't run nested under vitepress — so a package import would render stale CSS on
// every source edit. The source barrel reads the freshly-regenerated `src/generated/component-styles.ts`
// instead, so component edits hot-reload. Mirrors `formats/components/scripts/generate.ts`, which
// likewise imports `../src/index.ts`. This is a build-time docs script (never shipped to the browser).
import { componentsCss } from "../../../formats/components/src/index.ts";

/** The non-default themes whose overrides get attribute-scoped (rebrand is the unscoped base). */
const SCOPED_THEMES = ["canvas", "canvasHighContrast"] as const;

/**
 * Split `input` on top-level `separator`, ignoring separators nested inside parens (so commas inside
 * `:is(...)` / attribute values don't split a selector list). Mirrors the plugin's helper of the same
 * name so selector scoping stays robust without pulling in `postcss-selector-parser`.
 */
const splitTopLevel = (input: string, separator: string): string[] => {
  const out: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "(") depth++;
    else if (ch === ")" && depth > 0) depth--;
    else if (ch === separator && depth === 0) {
      out.push(input.slice(start, i).trim());
      start = i + 1;
    }
  }
  out.push(input.slice(start).trim());
  return out.filter(Boolean);
};

/** Prefix every selector in a (possibly comma-separated) list with the theme's attribute compound. */
const scopeSelector = (selector: string, attribute: string): string =>
  splitTopLevel(selector, ",")
    .map((part) => `${attribute} ${part}`)
    .join(",\n");

/**
 * The rebrand base sheet plus each other theme's overrides, scoped under
 * `:root[data-pantoken-theme="<theme>"]`. `prefix` is the class prefix (default `instui`), matching the
 * shipped sheet.
 */
export function scopedComponentsCss(prefix = "instui"): string {
  const base = componentsCss({ prefix, theme: "rebrand" });

  // Multiset of the base sheet's top-level nodes, keyed by their serialization (which excludes the
  // leading whitespace `raws.before`, so it's stable across sheets). Shared rules cancel; only the
  // theme-media-derived extras in each themed aggregate survive the diff.
  const baseCounts = new Map<string, number>();
  for (const node of postcss.parse(base).nodes)
    baseCounts.set(node.toString(), (baseCounts.get(node.toString()) ?? 0) + 1);

  const blocks: string[] = [];
  for (const theme of SCOPED_THEMES) {
    const remaining = new Map(baseCounts);
    const attribute = `:root[data-pantoken-theme="${theme}"]`;
    const deltas: string[] = [];

    for (const node of postcss.parse(componentsCss({ prefix, theme })).nodes) {
      const key = node.toString();
      const count = remaining.get(key) ?? 0;
      if (count > 0) {
        remaining.set(key, count - 1);
        continue;
      }
      // A theme-only node. We only know how to attribute-scope a plain rule; a differing at-rule means
      // a theme `@media` lives inside an `@scope`/`@media` (or a new authoring shape we haven't handled)
      // — scoping it from the outside would be invalid, so fail loud rather than emit wrong CSS.
      if (node.type !== "rule") {
        throw new Error(
          `scope-components: theme-conditional CSS inside @scope/@media is not supported by the docs ` +
            `scoping mode (theme "${theme}"): ${key.slice(0, 120)}`,
        );
      }
      const scoped = node.clone();
      scoped.selector = scopeSelector(node.selector, attribute);
      deltas.push(scoped.toString());
    }

    if (deltas.length)
      blocks.push(
        `/* ${theme} theme overrides — attribute-scoped for the docs runtime theme switch */\n` +
          deltas.join("\n\n"),
      );
  }

  return `${[base.trimEnd(), ...blocks].join("\n\n")}\n`;
}
