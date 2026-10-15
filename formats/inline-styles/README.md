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

Reference mode is the default and preserves expressions such as `gap: var(--gap)`. For literal
values, pass `{ resolveCSSVariables: true }` and supply the token declarations in the stylesheet
or document. Resolution happens before custom-property declarations are omitted, including when
`inlineCustomProperties` is false. Circular token definitions are rejected in resolved mode.
Variable substitution does not make pseudo-elements, media queries, or scripts portable as element
styles; consumers producing standalone content must handle those separately.

## Static Browser Snapshots

`inlineHtmlInBrowser` from `@pantoken/inline-styles/browser` finishes static HTML using the browser's
computed cascade. It resolves element declarations, copies inherited typography, and materializes
supported pseudo-element visuals as real markup. Packaged data-image glyphs become PNG images,
including color-tinted masks. The browser helper uses a temporary script-disabled iframe and does
not execute authored scripts or event attributes. Referenced author images may still need network
access. Responsive and interactive behavior is frozen rather than converted to JavaScript.

```ts
import { inlineHtmlInBrowser } from "@pantoken/inline-styles/browser";

const html = await inlineHtmlInBrowser(content, completeThemeCss);
```

The snapshot is light-only. Verify the resulting fragment against the destination's HTML sanitizer;
inlining is not a sanitizer or a guarantee that every host accepts data images and CSS properties.

## CLI

Use the hoisted `pantoken` CLI to inline an HTML file:

```sh
pantoken generate inline -i page.html -o page.inlined.html
```

The target accepts `-i, --input <file>`, `-o, --output <file>`, and optional `--css <file>`. For
pantoken-aware, email-compatible output, use `pantoken generate email` from `@pantoken/cli` and
`@pantoken/email`.

The standalone `pantoken-inline` command also accepts `--variables reference|resolved`:

```sh
pantoken-inline --input page.html --css theme.css --output page.inlined.html --variables resolved
```

## API

- **`inlineHtml(html, css, options?): string`** (from `@pantoken/inline-styles/html`) — inline
  matching CSS declarations into an HTML string.
- **`InlineHtmlOptions`** — controls fallback preservation and CSS variable resolution.

## Related

- `@pantoken/email` owns pantoken theme resolution and email-safe component filtering.
- Use `@pantoken/css` when a stylesheet with custom properties is preferable to inline declarations.

## License

MIT
