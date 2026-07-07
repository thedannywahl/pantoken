# @pantoken/scss

Instructure design tokens as SCSS variables, resolved to concrete single-mode values from the
pantoken IR — a self-contained SCSS token file (`$instui-color-brand: #0374b5;`). Icon tokens are
skipped; they belong in CSS.

## Install

```sh
npm i @pantoken/scss
```

Also available as `pantoken/scss`.

## Usage

```ts
import { toScss, scss } from "@pantoken/scss";
import { byTheme } from "@pantoken/tokens";

scss; // the ready-made rebrand variables
toScss(byTheme("canvas"), { mode: "dark" }); // convert any IR, picking the colour mode
```

Or `@use` the static file directly:

```scss
@use "@pantoken/scss/tokens.scss";
```

`light-dark()` tokens collapse to the chosen `mode` (default `light`), since SCSS variables are
compile-time single values. For runtime theming, use `@pantoken/css` instead.

## API

- **`scss: string`** — the ready-made `rebrand` variable set (also the default export).
- **`toScss(tokens, options?): string`** — emit SCSS variables for any token IR. `options.mode`
  picks the colour mode (default `"light"`).
- **`ToScssOptions`** — options for `toScss`.
- **`Mode`** — the colour mode to resolve (`"light"` or `"dark"`).
- **`./tokens.scss`** — the generated plain SCSS file, for a direct `@use` or `@import`.

## Related

- Built from the IR published by `@pantoken/tokens`.
- `@pantoken/less` and `@pantoken/stylus` emit the same tokens for other preprocessors.

## License

MIT
