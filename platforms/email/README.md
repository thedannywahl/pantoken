# @pantoken/email

Instructure design tokens for HTML email. Email clients don't support CSS custom properties and
often strip `<style>`, so tokens are fully resolved to concrete values for inline styling — colours
as hex, dimensions with `px`. Icons are excluded.

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

## Output

Plain `Record<string, string>` maps of concrete token values, ready to interpolate into inline
`style` attributes. No files are written and there's no CLI target — you import the values.

## API

- **`emailTokens(mode?): Record<string, string>`** — the token map for a mode (`"light"` default,
  or `"dark"`).
- **`light`** — the concrete light-mode token map.
- **`dark`** — the concrete dark-mode token map.

## Related

- Built on `@pantoken/tokens` (the vendored IR) and `@pantoken/utils` (`resolveTokens`, `camelCase`).

## License

MIT
