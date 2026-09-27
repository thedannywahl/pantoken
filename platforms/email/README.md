# @pantoken/email

Instructure design tokens and email-safe HTML generation. Email clients don't support CSS custom
properties and often strip `<style>`, so tokens are resolved to concrete inline values. Generated
component CSS uses a conservative, configurable email policy that omits interactive states and
unsupported components by default.

## Install

```sh
npm i @pantoken/email
```

Also available as `pantoken/email`.

## Usage

```ts
import { emailTokens } from "@pantoken/email";

const t = emailTokens("light");
// <td style={`background:${t.colorBackgroundBrand};color:${t.colorTextOnColor}`}>
```

The maps are keyed by camelCased token name (the `--instui-` prefix dropped): `--instui-color-
background-brand` becomes `colorBackgroundBrand`.

Generate email-compatible HTML:

```ts
import { inlineEmailHtml } from "@pantoken/email";

const html = inlineEmailHtml('<button class="instui-button">Save</button>', {
  theme: "canvas",
  client: "gmail",
});
```

The `client` profile can be `generic`, `outlook`, `gmail`, or `webkit`. Profiles control which
fallback rules are retained; they do not reconstruct table or VML layouts. Add or remove component
classes at the email boundary with `allowComponents` and `denyComponents`. Caller-supplied `extraCss`
is passed through separately.

The compatibility subpath remains available:

```ts
import { inlineEmailHtml } from "@pantoken/email/inline";
```

## CLI

```sh
pantoken generate email -i page.html -o page.email.html --client gmail
```

Use `--css <file>` to add caller-supplied CSS and `--theme <rebrand|canvas|canvasHighContrast>`
to select the token theme. The output is one HTML document; client profiles are filtering
capabilities, not a complete guarantee of rendering parity.

## Token maps

`emailTokens(mode?)`, `light`, and `dark` remain available when callers need to interpolate a
single token directly into an inline `style` attribute.

## API

- **`emailTokens(mode?): Record<string, string>`** — the token map for a mode (`"light"` default,
  or `"dark"`).
- **`light`** — the concrete light-mode token map.
- **`dark`** — the concrete dark-mode token map.
- **`inlineEmailHtml(html, options?): string`** — generate email-compatible HTML with resolved
  pantoken values and filtered component CSS.
- **`InlineEmailHtmlOptions`** — theme, mode, client profile, component policy, custom colors, and
  caller CSS options.
- **`EmailClient`** — `generic`, `outlook`, `gmail`, or `webkit`.

## Related

- Built on `@pantoken/tokens` (the vendored IR) and `@pantoken/utils` (`resolveTokens`, `camelCase`).

## License

MIT
