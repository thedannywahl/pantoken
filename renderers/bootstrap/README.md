# @pantoken/bootstrap

Theme [Bootstrap 5](https://getbootstrap.com) with Instructure tokens. It points Bootstrap's
`--bs-*` CSS variables at `var(--instui-*)`, so Bootstrap components adopt the Instructure look and
keep theming through the same custom properties.

## Install

```sh
npm i @pantoken/bootstrap
```

Also available as `pantoken/bootstrap`.

## Usage

Import the generated bridge stylesheet alongside the base token CSS:

```css
@import "@pantoken/css/style.css";
@import "@pantoken/bootstrap/theme.css";
```

Or generate the CSS yourself:

```ts
import { bootstrapCss, toBootstrapCss } from "@pantoken/bootstrap";

const css = toBootstrapCss({ selector: "[data-bs-theme]" });
```

Bootstrap Icons are separate; use `@pantoken/web-components` (`<instui-icon>`) for the Instructure
glyph set.

## API

- **`toBootstrapCss(options?): string`** — emit the Bootstrap-to-Instructure CSS-variable bridge. `options.selector` sets the emitting selector (default `":root"`).
- **`bootstrapCss: string`** — the ready-made bridge stylesheet. Also the default export.
- **`BOOTSTRAP_TO_INSTUI`** — frozen map of each Bootstrap `--bs-*` variable to the Instructure token it resolves to.
- **`ToBootstrapCssOptions`** — options interface for `toBootstrapCss`.
- **`./theme.css`** — the pre-generated bridge stylesheet, ready to `@import`.

## Related

- Pairs with `@pantoken/css` for the base `--instui-*` custom properties.

## License

MIT
