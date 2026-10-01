# @pantoken/foundation

Theme [Foundation for Sites](https://get.foundation) with Instructure tokens. The Sass settings
partial supplies concrete light-mode rebrand colors that Foundation's color functions can compile.
The separate CSS overlay uses `var(--instui-*)` to theme common compiled classes at runtime.

## Compatibility

Verified with Foundation for Sites 6.1.2 through 6.9.0: the Sass settings compile a primary button
with the rebrand color, and the runtime overlay preserves Pantoken variables. Foundation 6.0.6 did
not pass the primary-button check. See the [compatibility matrix](https://pantoken.app/compatibility)
for exact tested releases.

## Install

```sh
npm i @pantoken/foundation
```

Also available as `pantoken/foundation`.

## Usage

Sass build — import the settings before Foundation so its palette is in scope:

```scss
@import "@pantoken/foundation/settings.scss";
@import "foundation-sites/scss/foundation";
@include foundation-everything;
```

```css
@import "@pantoken/css/style.css";
@import "@pantoken/foundation/theme.css";
```

Stock CSS — layer the runtime overlay on top of compiled Foundation:

```css
@import "@pantoken/css/style.css";
@import "foundation-sites/dist/css/foundation.min.css";
@import "@pantoken/foundation/theme.css";
```

Or generate either layer yourself:

```ts
import { foundationSettings, toFoundationCss } from "@pantoken/foundation";

const scoped = toFoundationCss({ scope: ".instui" });
```

## API

- **`toFoundationSettings(options?): string`** — emit the Foundation Sass settings override.
  `options.useDefault` appends `!default` so consumer settings still win.
- **`toFoundationCss(options?): string`** — emit the runtime CSS overlay. `options.scope` prefixes
  every selector so the overlay is contained.
- **`foundationSettings: string`**, **`foundationCss: string`** — the ready-made layers.
  `foundationCss` is the default export.
- **`FOUNDATION_TO_INSTUI`** — frozen map of each Foundation setting variable to its Instructure
  token.
- **`ToFoundationSettingsOptions`**, **`ToFoundationCssOptions`** — the options interfaces.
- **`./settings.scss`**, **`./theme.css`** — the pre-generated Sass and CSS layers.

## Related

- Pairs with `@pantoken/css` for the base `--instui-*` custom properties.
- `@pantoken/bootstrap` and `@pantoken/shadcn` are the same idea for other frameworks.

## License

MIT
