# @pantoken/typedoc-plugin-live-example

Embed a live HTML preview beneath each `@example` on a CSS reference page.

`@cssdoc/markdown` renders an `@example` as a plain ` ```html ` code fence and keeps it that way — a
generic renderer can't assume the host page loads the component CSS. When your docs _do_ load the
component stylesheet globally (pantoken's do), this plugin makes each example render live under its
source: after every ` ```html ` fence it appends a `<div class="css-example">` holding the same markup.
Overlay examples (`<dialog>`, `[popover]`) are skipped — they're hidden until opened, so a `## Demo`
iframe drives their preview instead.

By default the preview is wrapped in `<div class="css-example">`, but the **wrapper structure is
yours** — pass a `wrap` function (or a `liveExampleWrapper` template in config) to render each example in
any element you like, e.g. a card:

```html
<div class="instui-card">
  <!-- your example markup -->
</div>
```

## Usage

Register it as a TypeDoc plugin (rewrites pages under `liveExampleDir`, default `css`, on render end).
`liveExampleWrapper` is a template whose `%s` is replaced by the example markup:

```json
{
  "plugin": ["typedoc-plugin-markdown", "@cssdoc/typedoc", "@pantoken/typedoc-plugin-live-example"],
  "liveExampleDir": "css",
  "liveExampleWrapper": "<div class=\"instui-card\">%s</div>"
}
```

Or call it directly when your CSS pages are written by a post-render step — `wrap` gives full control of
the wrapper structure:

```ts
import { injectLiveExamples, withLiveExamples } from "@pantoken/typedoc-plugin-live-example";

// Default `<div class="css-example">` wrapper:
injectLiveExamples("docs/api/css");
// Custom structure — a card:
injectLiveExamples("docs/api/css", {
  wrap: (html) => `<div class="instui-card">\n${html}\n</div>`,
});
const page = withLiveExamples(markdown, { wrap }); // or transform one page's markdown
```

## API

- **`withLiveExamples(markdown, options?): string`** — append a live-preview block after each ` ```html ` fence in a markdown string.
- **`injectLiveExamples(dir, options?): number`** — rewrite every `.md` under `dir` (recursively) in place; returns the count changed.
- **`LiveExampleOptions.wrap(html): string`** — build the block inserted after each fence; controls the wrapper structure (default `<div class="css-example">…</div>`).
- **`defaultWrap(html): string`** — the default `css-example` wrapper, exported for composition.
- **`load(app): void`** — the TypeDoc plugin entry point (options: `liveExampleDir`, `liveExampleWrapper`).
