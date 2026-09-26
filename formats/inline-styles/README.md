# @pantoken/inline-styles

Inline CSS into HTML with pantoken styles. This package is useful for email, static HTML, and other
outputs where the main declarations need to live on matching elements while pseudo-classes,
media queries, and similar fallbacks can remain in a `<style>` element.

## Install

```sh
npm i @pantoken/inline-styles
```

Also available as `pantoken/inline-styles`.

## Usage

Inline a stylesheet into an HTML fragment:

```ts
import { inlineHtml } from "@pantoken/inline-styles/html";

const html = inlineHtml(
  '<button class="action">Save</button>',
  ".action { color: red; } .action:hover { color: blue; }",
);
```

Inline a complete pantoken theme and component stylesheet:

```ts
import { inlinePantokenHtml } from "@pantoken/inline-styles/pantoken-html";

const html = inlinePantokenHtml('<button class="instui-button">Save</button>', {
  theme: "canvas",
  mode: "dark",
  customColor: "#e62429",
  extraCss: ".notice { font-weight: 700; }",
});
```

Pantoken inlining resolves token references for the selected theme and color scheme, so the
resulting declarations do not depend on CSS custom properties. `inlineHtml` preserves fallback
rules by default; set `preserveFallbacks: false` to remove the retained `<style>` rules. Use
`resolveCSSVariables` when CSS variables should be resolved from document declarations.

## CLI

Use the hoisted `pantoken` CLI to inline an HTML file:

```sh
pantoken generate inline -i page.html -o page.inlined.html
```

The target accepts `-i, --input <file>` and `-o, --output <file>`, and supports the shared
`--theme <rebrand|canvas|canvasHighContrast>` option. The package also exposes the lower-level
`pantoken-inline` binary for direct use.

## API

- **`inlineHtml(html, css, options?): string`** (from `@pantoken/inline-styles/html`) — inline
  matching CSS declarations into an HTML string.
- **`InlineHtmlOptions`** — controls fallback preservation and CSS variable resolution.
- **`inlinePantokenHtml(html, options?): string`** (from
  `@pantoken/inline-styles/pantoken-html`) — inline resolved pantoken tokens, component styles,
  and optional custom CSS.
- **`PantokenHtmlOptions`** — selects the theme, mode, component prefix, color scale, custom color,
  fallback behavior, and additional CSS.

## Related

- Pairs with `@pantoken/components` for the component stylesheet and `@pantoken/tokens` for the
  source token themes.
- Use `@pantoken/css` when a stylesheet with custom properties is preferable to inline declarations.

## License

MIT
