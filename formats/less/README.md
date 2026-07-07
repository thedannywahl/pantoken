# @pantoken/less

Instructure design tokens as Less variables, resolved to concrete single-mode values from the
pantoken IR — a self-contained Less token file (`@instui-color-brand: #0374b5;`). Icon tokens are
skipped; they belong in CSS.

## Install

```sh
npm i @pantoken/less
```

Also available as `pantoken/less`.

## Usage

```ts
import { toLess, less } from "@pantoken/less";
import { tokens } from "@pantoken/tokens";

less; // the ready-made rebrand variables
toLess(tokens, { mode: "dark" }); // convert any IR, picking the colour mode
```

Or `@import` the static file straight into a Less build:

```less
@import "@pantoken/less/tokens.less";

.button {
  background: @instui-color-brand;
}
```

Values are resolved once, in a single colour mode (`light` by default). References (`var(...)`) and
`light-dark(...)` are flattened to concrete values, so the output stands alone. For runtime theming,
use `@pantoken/css` instead.

## API

- **`less: string`** — the ready-made `rebrand` variable set (also the default export).
- **`toLess(tokens, options?): string`** — emit Less variables for any token IR. `options.mode`
  picks the colour mode (default `"light"`).
- **`ToLessOptions`** — options for `toLess`.
- **`Mode`** — the colour mode to resolve (`"light"` or `"dark"`).
- **`./tokens.less`** — the generated plain Less file, for a direct `@import`.

## Related

- Built from the IR published by `@pantoken/tokens`.
- `@pantoken/scss` and `@pantoken/stylus` emit the same tokens for other preprocessors.

## License

MIT
