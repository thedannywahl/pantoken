/**
 * `@pantoken/typedoc-plugin-live-example` — embed a live HTML preview beneath each `@example` on a CSS
 * reference page.
 *
 * `@cssdoc/markdown` renders an `@example` as a plain ` ```html ` code fence, and stays that way on
 * purpose — a generic renderer can't assume the host page loads the component CSS globally. pantoken's
 * docs DO load `@pantoken/components` globally, so each example can render live under its source. This
 * plugin post-processes the emitted markdown: after every ` ```html ` fence it appends a
 * `<div class="css-example">` holding the same markup, which the docs theme styles as one joined
 * "source + preview" card. Overlay examples (`<dialog>`, `[popover]`) are skipped — they're hidden until
 * opened, so their `## Demo` iframe drives the preview instead.
 *
 * Usable two ways: call {@link withLiveExamples} / {@link injectLiveExamples} directly when your CSS
 * pages are written by a post-render step, or register it as a TypeDoc plugin — {@link load} rewrites the
 * pages under `liveExampleDir` on `RendererEvent.END`.
 *
 * @module
 * @beta
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { type Application, ParameterType, RendererEvent } from "typedoc";

/** A fenced ` ```html ` block and its inner markup. */
const HTML_FENCE = /```html\n([\s\S]*?)\n```/gu;

/** An example that's hidden until opened (a `<dialog>` or a `[popover]`), so its live preview is skipped. */
function isOverlay(html: string): boolean {
  return /^<dialog\b/u.test(html.trim()) || /\spopover(?:=|\s|>)/u.test(html);
}

/** Options controlling how a live-example preview is built. */
export interface LiveExampleOptions {
  /**
   * Build the block inserted after each ` ```html ` fence from the example's markup — override this to
   * control the wrapper STRUCTURE (a card element, extra nesting, data attributes, …). It's called only
   * for non-overlay examples. Defaults to {@link defaultWrap} (`<div class="css-example">…</div>`).
   *
   * @param html - The example's raw HTML (verbatim from the fence).
   * @returns The markdown/HTML block to place beneath the source fence.
   */
  wrap?: (html: string) => string;
}

/** The default wrapper: the example markup in a `<div class="css-example">`. */
export function defaultWrap(html: string): string {
  return `<div class="css-example">\n${html}\n</div>`;
}

/**
 * Append a live preview after each ` ```html ` fence in `markdown`, echoing the fence's markup through
 * {@link LiveExampleOptions.wrap} so it renders beneath the source. Overlay examples are left source-only.
 *
 * @param markdown - The rendered page markdown.
 * @param options - Wrapper structure ({@link LiveExampleOptions}).
 * @returns The markdown with live-preview blocks inserted.
 *
 * @example
 * ```ts
 * import { withLiveExamples } from "@pantoken/typedoc-plugin-live-example";
 *
 * // Default wrapper:
 * withLiveExamples(page);
 * // Custom structure — a card:
 * withLiveExamples(page, { wrap: (html) => `<div class="instui-card">\n${html}\n</div>` });
 * ```
 */
export function withLiveExamples(markdown: string, options: LiveExampleOptions = {}): string {
  const wrap = options.wrap ?? defaultWrap;
  return markdown.replace(HTML_FENCE, (fence: string, html: string) =>
    isOverlay(html) ? fence : `${fence}\n\n${wrap(html)}`,
  );
}

/**
 * Rewrite every `.md` under `dir` (recursively) through {@link withLiveExamples}.
 *
 * @param dir - The directory of CSS reference pages.
 * @param options - Wrapper structure ({@link LiveExampleOptions}).
 * @returns How many files were changed.
 */
export function injectLiveExamples(dir: string, options: LiveExampleOptions = {}): number {
  let changed = 0;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      changed += injectLiveExamples(path, options);
    } else if (name.endsWith(".md")) {
      const before = readFileSync(path, "utf8");
      const after = withLiveExamples(before, options);
      if (after !== before) {
        writeFileSync(path, after, "utf8");
        changed++;
      }
    }
  }
  return changed;
}

/**
 * TypeDoc entry point. On `RendererEvent.END`, rewrites the CSS reference pages (default `<output>/css`,
 * override with `liveExampleDir`) to embed a live preview beneath each `@example`. Set `liveExampleWrapper`
 * to a template whose `%s` is replaced by the example markup — e.g. `<div class="instui-card">%s</div>` —
 * to control the wrapper structure from config; omit it for the default `<div class="css-example">`.
 *
 * @param app - The TypeDoc application.
 */
export function load(app: Application): void {
  app.options.addDeclaration({
    name: "liveExampleDir",
    help: "Subdirectory under the docs output whose pages get live-example previews.",
    type: ParameterType.String,
    defaultValue: "css",
  });
  app.options.addDeclaration({
    name: "liveExampleWrapper",
    help: 'Wrapper template; `%s` is replaced by the example markup. Empty → `<div class="css-example">`.',
    type: ParameterType.String,
    defaultValue: "",
  });
  app.renderer.on(RendererEvent.END, (event: RendererEvent) => {
    const dir = join(event.outputDirectory, app.options.getValue("liveExampleDir") as string);
    const template = app.options.getValue("liveExampleWrapper") as string;
    const wrap = template ? (html: string) => template.replace("%s", html) : undefined;
    try {
      injectLiveExamples(dir, { wrap });
    } catch {
      // The pages live elsewhere (or weren't emitted this run) — nothing to enhance.
    }
  });
}
