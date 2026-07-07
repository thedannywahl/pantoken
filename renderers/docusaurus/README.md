# @pantoken/docusaurus

Theme a Docusaurus site with Instructure tokens. Docusaurus styling comes from Infima, whose theming is driven by `--ifm-*` CSS variables; this points them at `var(--instui-*)`, so the docs pick up the Instructure look and stay in sync with the theme toggle.

## Install

```sh
npm i @pantoken/docusaurus @pantoken/css
```

Also available as `pantoken/docusaurus`.

## Usage

Import the token layer and the bridge from your custom CSS (`src/css/custom.css`), which Docusaurus loads via `themeConfig`:

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

Light and dark flow through the `--instui-*` tokens (which use `light-dark()`), so Docusaurus's theme toggle stays in sync. Infima hard-codes the `--ifm-color-primary-*` shades for hover and active states; this bridge points them all at the brand color, so override individual shades in your `custom.css` if you want distinct hover shades. Because the values are `var(--instui-*)` references, `@pantoken/css` must be present to define them.

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
