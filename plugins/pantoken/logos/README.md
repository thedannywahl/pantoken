# @pantoken/plugin-logos

Instructure product logos as SVGs, data URIs, and image tokens. Covers Canvas, Mastery, Parchment,
Instructure, LearnPlatform, Ignite AI, and pantoken, in the standard layouts (horizontal, stacked,
icon) and color modes (full-color, color, dark, reversed, and more). Some wordmarks also ship
localized variants keyed by a trailing language code (e.g. `ar`, `zh`). The SVGs ship in the
package.

## Install

```sh
npm i @pantoken/plugin-logos
```

Also available as `pantoken/logos`.

## Usage

Get a logo in code:

```ts
import { getLogoSvg, getLogoDataUri } from "@pantoken/plugin-logos";

const svg = getLogoSvg("canvas", "horizontal", "full-color");
const uri = getLogoDataUri("mastery", "icon", "color");
const arabic = getLogoSvg("pantoken", "horizontal", "full-color", "ar");
```

Or use the image tokens in CSS:

```ts
import "@pantoken/plugin-logos/logos.css";
```

```css
.brand {
  background-image: var(--instui-logo-instructure-horizontal-full-color);
}
```

## API

- **`getLogoSvg(product, layout?, colorMode?, lang?)`** — the raw SVG (defaults: `horizontal`,
  `full-color`), or `undefined` if the combination doesn't exist. Pass `lang` to get a localized
  wordmark variant, where one exists.
- **`getLogoDataUri(product, layout?, colorMode?, lang?)`** — the logo as a base64
  `data:image/svg+xml` URI.
- **`logosPlugin(options?)`** — the plugin. Its `css` hook contributes the `--instui-logo-*` image
  tokens. `options.position` is `"append"` (default) or `"prepend"`.
- **`logos`** — every logo's metadata (product, layout, color mode, optional lang, name, path).
- **`products`** — the products that have logos.
- **`logosCss`** — the stylesheet text (the same as the `./logos.css` export).
- **`./logos.css`** — the ready image-token stylesheet, one `--instui-logo-<product>-<layout>-<mode>`
  custom property per logo.

## License

MIT — the plugin's code. The logos are Instructure trademarks; use them per Instructure's brand
guidelines.
