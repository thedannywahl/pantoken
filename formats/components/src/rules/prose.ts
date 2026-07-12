/**
 * The `prose` rule — typographic defaults for raw HTML under a content-root scope. Unlike the other
 * rules it's parameterized by a `scope` selector (not a class prefix), so it keeps its bespoke
 * `proseCss({ scope })` builder plus a {@link Definition}-shaped {@link prose} object (default
 * `.pantoken-prose` scope) for the registry + `validate()`.
 *
 * @module
 */
import type { Definition } from "../lib/define.ts";
import { headingLevelRules } from "../lib/headings.ts";

/** The prose rule's cssdoc doc comment (authored inline; the CSS body follows from {@link proseBody}). */
const PROSE_DOC = `/**
 * @rule prose
 * @summary Typographic defaults for raw HTML — headings, paragraphs, lists, links, and code — under the \`.pantoken-prose\` scope.
 * @example
 * <article class="pantoken-prose">
 *   <h2>Release notes</h2>
 *   <p>Body copy with a <a href="/">link</a>.</p>
 * </article>
 */`;

/** Build the InstUI-look prose CSS body (no doc block) under a scope selector `s`. */
function proseBody(s: string): string {
  return `
/* Body text is InstUI's Text \`content\` type style. */
${s} {
  color: var(--instui-component-text-base-color);
  font-family: var(--instui-component-text-content-font-family);
  font-size: var(--instui-component-text-content-font-size);
  font-weight: var(--instui-component-text-content-font-weight);
  line-height: var(--instui-component-text-content-line-height);
}

/*
 * Headings are InstUI's Heading component per level: one heading line-height and colour, but a
 * per-level font size and weight (h1/h3/h4 are strong, h2/h5/h6 are base — straight from the tokens).
 */
${s} h1, ${s} h2, ${s} h3, ${s} h4, ${s} h5, ${s} h6 {
  color: var(--instui-component-heading-base-color);
  font-family: var(--instui-component-heading-h1-font-family);
  line-height: var(--instui-component-heading-line-height);
  margin: var(--instui-spacing-space-lg) 0 var(--instui-spacing-space-sm);
}
${headingLevelRules((l) => `${s} ${l}`)}

${s} p { margin: var(--instui-spacing-space-md) 0; }

${s} a {
  color: var(--instui-color-text-interactive-navigation-primary-base);
  text-decoration: underline;
}
${s} a:hover { color: var(--instui-color-text-interactive-navigation-primary-hover); }

${s} strong, ${s} b { font-weight: var(--instui-component-text-content-important-font-weight); }
${s} em, ${s} i { font-style: italic; }
${s} small { font-size: var(--instui-component-text-content-small-font-size); }
${s} del, ${s} s { text-decoration: line-through; color: var(--instui-color-text-muted); }

${s} ul, ${s} ol { margin: var(--instui-spacing-space-md) 0; padding-inline-start: var(--instui-spacing-space-lg); }
${s} li { margin: var(--instui-spacing-space2xs) 0; }
${s} li.task-list-item { list-style: none; }
${s} input[type="checkbox"] {
  accent-color: var(--instui-color-text-interactive-navigation-primary-base);
  margin-inline-end: var(--instui-spacing-space-xs);
}

/* Blockquotes use InstUI's Text \`contentQuote\` type style, with a leading rule. */
${s} blockquote {
  margin: var(--instui-spacing-space-md) 0;
  padding-inline-start: var(--instui-spacing-space-md);
  border-inline-start: var(--instui-border-width-lg) solid var(--instui-color-stroke-base);
  color: var(--instui-component-text-base-color);
  font-size: var(--instui-component-text-content-quote-font-size);
  line-height: var(--instui-component-text-content-quote-line-height);
}

${s} code {
  font-family: var(--instui-font-family-code);
  font-size: 0.9em;
  background: var(--instui-color-background-muted);
  padding: var(--instui-spacing-space2xs) var(--instui-spacing-space-xs);
  border-radius: var(--instui-border-radius-sm);
}
${s} pre {
  font-family: var(--instui-font-family-code);
  background: var(--instui-color-background-container);
  color: var(--instui-color-text-base);
  padding: var(--instui-spacing-space-md);
  border: var(--instui-border-width-sm) solid var(--instui-color-stroke-base);
  border-radius: var(--instui-border-radius-md);
  overflow-x: auto;
}
${s} pre code { background: none; padding: 0; border-radius: 0; font-size: inherit; }

${s} hr {
  border: none;
  border-top: var(--instui-border-width-sm) solid var(--instui-color-stroke-base);
  margin: var(--instui-spacing-space-lg) 0;
}
${s} img { max-width: 100%; border-radius: var(--instui-border-radius-md); }

/* Prose only styles RAW markdown tables — i.e. classless \`<table>\` output. A classed table
   (\`.instui-table\` and friends) owns its own layout via its component CSS, so \`:not([class])\` keeps
   prose from injecting borders/backgrounds into it (prose is for typography of rendered markup, not
   table layout of components). */
${s} table:not([class]) {
  border-collapse: collapse;
  width: 100%;
  margin: var(--instui-spacing-space-md) 0;
  background: var(--instui-component-table-background);
  color: var(--instui-component-table-color);
  font-family: var(--instui-component-table-font-family);
  font-size: var(--instui-component-table-font-size);
}
${s} table:not([class]) th {
  text-align: start;
  background: var(--instui-component-table-col-header-background);
  color: var(--instui-component-table-col-header-color);
  font-weight: var(--instui-component-table-head-font-weight);
  padding: var(--instui-component-table-col-header-padding-vertical) var(--instui-component-table-col-header-padding-horizontal);
  border-bottom: var(--instui-border-width-md) solid var(--instui-component-table-row-border-color);
}
${s} table:not([class]) td {
  color: var(--instui-component-table-cell-color);
  line-height: var(--instui-component-table-cell-line-height);
  padding: var(--instui-component-table-cell-padding-vertical) var(--instui-component-table-cell-padding-horizontal);
  border-bottom: var(--instui-border-width-sm) solid var(--instui-component-table-row-border-color);
}
`;
}

/** Options for {@link proseCss}. */
export interface ProseOptions {
  /** The content-root selector the rules attach to (default `".pantoken-prose"`). */
  scope?: string;
}

/**
 * Build the InstUI-look prose stylesheet, scoped to `options.scope` (default `.pantoken-prose`).
 *
 * @param options - {@link ProseOptions}.
 * @returns The CSS string.
 *
 * @demo self:prose
 */
export function proseCss(options: ProseOptions = {}): string {
  const scope = options.scope ?? ".pantoken-prose";
  return `/* InstUI-look prose styles (@pantoken/components) — scope: ${scope} */\n${PROSE_DOC}\n${proseBody(scope).trim()}\n`;
}

/**
 * The {@link Definition}-shaped view of the prose rule for the RULES registry + `validate()`. `css()`
 * emits the default-scoped, doc-bearing single record ({@link PROSE_DOC} + the `.pantoken-prose` body).
 */
export const prose: Definition = {
  name: "prose",
  kind: "rule",
  rules: () => `${PROSE_DOC}\n${proseBody(".pantoken-prose").trim()}\n`,
  css: () => `${PROSE_DOC}\n${proseBody(".pantoken-prose").trim()}\n`,
};
