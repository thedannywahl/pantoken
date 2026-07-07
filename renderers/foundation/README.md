# @pantoken/foundation

Theme [Foundation for Sites](https://get.foundation) with Instructure tokens. Foundation is
Sass-first, so this package ships two layers: a `_settings` Sass override that points Foundation's
setting variables at `var(--instui-*)`, and a thin CSS overlay that themes the common compiled
classes the same way at runtime.

## Install

```sh
npm i @pantoken/foundation
```

Also available as `pantoken/foundation`.

## Usage

Sass build — load the settings override before Foundation, alongside the base token CSS:

```scss
@use "@pantoken/foundation/settings.scss";
@import "foundation-sites/scss/foundation";
@include foundation-everything;
```

```css
@import "@pantoken/css/style.css";
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
