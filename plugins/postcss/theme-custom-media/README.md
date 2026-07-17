# @pantoken/plugin-theme-custom-media

A PostCSS plugin for theme-aware CSS authoring. It supports both theme custom-idents in media
features (for example, `(theme: canvas)`) and `@custom-media --theme-*` aliases, then lowers them
to concrete target-theme output.

## Install

```sh
npm i -D @pantoken/plugin-theme-custom-media postcss
```

Also available as `pantoken/themeCustomMedia`.

## Usage

```ts
import postcss from "postcss";
import { themeCustomMedia } from "@pantoken/plugin-theme-custom-media";

const out = postcss([themeCustomMedia({ theme: "canvas" })]).process(css, { from: undefined }).css;
```

## Authoring

### Theme custom-idents

Author directly with the `theme` media feature:

```css
@media (theme: canvas) {
  .button {
    color: blue;
  }
}

@media (theme: rebrand) and (prefers-color-scheme: dark) {
  .button {
    color: white;
  }
}
```

For the selected target theme, non-matching theme branches are dropped, matching `theme:*`
clauses are removed, and wrappers that become unconditional are unwrapped.

### Theme custom-media aliases

Author with `@custom-media` aliases and consume them in `@media`:

```css
@custom-media --theme-canvas (theme: canvas);
@custom-media --theme-dark (theme: rebrand) and (prefers-color-scheme: dark);

@media (--theme-canvas) {
  .button {
    color: blue;
  }
}
```

Built-in `--theme-*` aliases are expanded before lowering, and emitted CSS removes only
`@custom-media --theme-*` declarations. Non-theme aliases are preserved.

## Aliases

- `--theme-rebrand` -> `(theme: rebrand)`
- `--theme-canvas` -> `(theme: canvas)`
- `--theme-canvas-high-contrast` -> `(theme: canvasHighContrast)`
- `--theme-light` -> `(theme: rebrand) and (prefers-color-scheme: light)`
- `--theme-dark` -> `(theme: rebrand) and (prefers-color-scheme: dark)`

## API

- `themeCustomMedia(options?): Plugin` - create the lowering plugin.
- default export - `themeCustomMedia`.

## License

MIT
