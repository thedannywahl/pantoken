# @pantoken/stylus

Instructure design tokens as Stylus variables, resolved to concrete single-mode values from the
pantoken IR — a self-contained Stylus token file (`instui-color-brand = #0374b5`). Icon tokens are
skipped; they belong in CSS.

## Install

```sh
npm i @pantoken/stylus
```

Also available as `pantoken/stylus`.

## Usage

```ts
import { toStylus, stylus } from "@pantoken/stylus";
import { tokens } from "@pantoken/tokens";

stylus; // the ready-made rebrand variables
toStylus(tokens, { mode: "dark" }); // convert any IR, picking the colour mode
```

Or `@import` the static file straight into a Stylus build:

```stylus
@import "@pantoken/stylus/tokens.styl"

.button
  background instui-color-brand
```

Values are resolved once, in a single colour mode (`light` by default). References (`var(...)`) and
`light-dark(...)` are flattened to concrete values, so the output stands alone. For runtime theming,
use `@pantoken/css` instead.

## API

- **`stylus: string`** — the ready-made `rebrand` variable set (also the default export).
- **`toStylus(tokens, options?): string`** — emit Stylus variables for any token IR. `options.mode`
  picks the colour mode (default `"light"`).
- **`ToStylusOptions`** — options for `toStylus`.
- **`Mode`** — the colour mode to resolve (`"light"` or `"dark"`).
- **`./tokens.styl`** — the generated plain Stylus file, for a direct `@import`.

## Related

- Built from the IR published by `@pantoken/tokens`.
- `@pantoken/scss` and `@pantoken/less` emit the same tokens for other preprocessors.

## License

MIT
