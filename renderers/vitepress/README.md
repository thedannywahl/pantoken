# @pantoken/vitepress

Theme a VitePress site with Instructure tokens. VitePress theming is driven by `--vp-*` CSS
variables; this points them at `var(--instui-*)`, so the docs pick up the Instructure look and stay
in sync with the appearance toggle.

## Install

```sh
npm i @pantoken/vitepress @pantoken/css
```

Also available as `pantoken/vitepress`.

## Usage

Register a theme CSS file (`.vitepress/theme/custom.css`) from your theme's `index.ts`, and import
both the token layer and the bridge:

```css
/* .vitepress/theme/custom.css */
@import "@pantoken/css/style.css"; /* defines the --instui-* custom properties */
@import "@pantoken/vitepress/custom.css"; /* maps VitePress --vp-* → var(--instui-*) */
```

Or generate the bridge yourself:

```ts
import { toVitePressCss } from "@pantoken/vitepress";

const css = toVitePressCss();
```

Light and dark flow through the `--instui-*` tokens (which use `light-dark()`), so VitePress's
appearance toggle stays in sync. VitePress uses `--vp-c-brand-1/2/3` for accent, hover, and solid
states; this bridge points them all at the brand color, so override individual shades in your
`custom.css` for distinct states. Because the values are `var(--instui-*)` references, `@pantoken/css`
must be present to define them.

## API

- **`toVitePressCss(options?): string`** — emit the VitePress → Instructure bridge CSS. Pass
  `{ selector }` to change the wrapping selector (default `":root"`).
- **`vitePressCss: string`** — the ready-made bridge stylesheet.
- **`VITEPRESS_TO_INSTUI`** — the frozen map of VitePress CSS variable to the Instructure token it
  resolves to.
- **`ToVitePressCssOptions`** — options type for `toVitePressCss`.
- **`./custom.css`** — the generated static bridge stylesheet, for `@import` from your `custom.css`.

## Related

- Pairs with `@pantoken/css` for the `--instui-*` custom properties the bridge points at.

## License

MIT
