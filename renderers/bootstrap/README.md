# @pantoken/bootstrap

Theme [Bootstrap 5](https://getbootstrap.com) body variables and primary buttons with Instructure
tokens. The bridge points those `--bs-*` variables at `var(--instui-*)`; other component variants
retain their Bootstrap defaults.

## Compatibility

Verified with Bootstrap 5.2.0 through 5.3.8 for body background and primary-button states.
Bootstrap 5.0 and 5.1 hard-code button colors, so this bridge does not claim to theme them.
See the [compatibility matrix](https://pantoken.app/compatibility) for exact tested releases.

## Install

```sh
npm i @pantoken/bootstrap
```

Also available as `pantoken/bootstrap`.

## Usage

Load Bootstrap first, then the base token CSS and generated bridge stylesheet:

```css
@import "bootstrap/dist/css/bootstrap.css";
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
