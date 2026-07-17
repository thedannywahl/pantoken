# @pantoken/plugin-theme-custom-media

A PostCSS plugin that supports theme-aware CSS authoring with `@media (--theme-*)` aliases, then
lowers them to concrete target-theme output.

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
