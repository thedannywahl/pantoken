# @pantoken/inline-styles

Inline CSS into HTML with Juice. This is the generic CSS-to-HTML engine used by platform packages;
it does not resolve pantoken themes or generate component styles.

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

Inline caller-supplied CSS:

```ts
import { inlineHtml } from "@pantoken/inline-styles/html";

const html = inlineHtml('<button class="action">Save</button>', ".action { color: red; }");
```

`inlineHtml` preserves fallback rules by default; set `preserveFallbacks: false` to remove retained
`<style>` rules. Use `resolveCSSVariables` when CSS variables should be resolved from document
declarations. HTML may also contain its own `<style>` blocks; pass additional CSS as the second
argument when needed.

## CLI

Use the hoisted `pantoken` CLI to inline an HTML file:

```sh
pantoken generate inline -i page.html -o page.inlined.html
```

The target accepts `-i, --input <file>`, `-o, --output <file>`, and optional `--css <file>`. For
pantoken-aware, email-compatible output, use `pantoken generate email` from `@pantoken/cli` and
`@pantoken/email`.

## API

- **`inlineHtml(html, css, options?): string`** (from `@pantoken/inline-styles/html`) — inline
  matching CSS declarations into an HTML string.
- **`InlineHtmlOptions`** — controls fallback preservation and CSS variable resolution.

## Related

- `@pantoken/email` owns pantoken theme resolution and email-safe component filtering.
- Use `@pantoken/css` when a stylesheet with custom properties is preferable to inline declarations.

## License

MIT
