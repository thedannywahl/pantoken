# @pantoken/docusaurus

Theme a Docusaurus site with Instructure tokens. Docusaurus styling comes from Infima, whose theming is driven by `--ifm-*` CSS variables; this points them at `var(--instui-*)` so Infima styles can use the token layer.

## Compatibility

Verified against Infima CSS shipped with Docusaurus theme-classic 3.0.0 through 3.10.2: the
primary-color and background variables are defined by the theme and mapped by the bridge. This
checks CSS variable compatibility, not a complete Docusaurus site build. See the
[compatibility matrix](https://pantoken.app/compatibility) for exact tested releases.

## Install

```sh
npm i @pantoken/docusaurus @pantoken/css
```

Also available as `pantoken/docusaurus`.

## Usage

Import the token layer and the bridge from your custom CSS (`src/css/custom.css`), configured as
`theme.customCss` in the classic preset:

```css
/* src/css/custom.css */
@import "@pantoken/css/style.css"; /* defines the --instui-* custom properties */
@import "@pantoken/docusaurus/custom.css"; /* maps Infima --ifm-* → var(--instui-*) */
```

Or generate the bridge yourself:

```ts
import { toDocusaurusCss } from "@pantoken/docusaurus";

const css = toDocusaurusCss();
```

The bridge inherits `--instui-*` token values; check your site's `color-scheme` behavior when using Docusaurus's theme toggle. Infima hard-codes the `--ifm-color-primary-*` shades for hover and active states; this bridge points them all at the brand color, so override individual shades in your `custom.css` if you want distinct hover shades. Because the values are `var(--instui-*)` references, `@pantoken/css` must be present to define them.

## API

- **`toDocusaurusCss(options?): string`** — emit the Infima → Instructure bridge CSS. Pass `{ selector }` to change the wrapping selector (default `":root"`).
- **`docusaurusCss: string`** — the ready-made bridge stylesheet.
- **`INFIMA_TO_INSTUI`** — the frozen map of Infima CSS variable to the Instructure token it resolves to.
- **`ToDocusaurusCssOptions`** — options type for `toDocusaurusCss`.
- **`./custom.css`** — the generated static bridge stylesheet, for `@import` from your `custom.css`.

## Related

- Pairs with `@pantoken/css` for the `--instui-*` custom properties the bridge points at.

## License

MIT
