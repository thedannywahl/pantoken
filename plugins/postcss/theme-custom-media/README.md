# @pantoken/plugin-theme-custom-media

A PostCSS plugin for theme-aware CSS authoring. It supports both theme custom-idents in media
features (for example, `(theme: canvas)`) and `@custom-media --theme-*`/`--breakpoint-*` aliases,
then lowers them to concrete target-theme output.

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

### Breakpoint aliases

Every alias below comes in `-up`/`-down` pairs (`(min-width: …)`/`(max-width: …)`), e.g.
`--breakpoint-lg-up` / `--breakpoint-lg-down`. The `-down` value is a hair (0.0625em) narrower than
the next tier's `-up` value, so the pair never overlaps at the boundary.

The scale tiers are sourced from `@pantoken/tokens`' `--instui-component-tray-width-*` and are
identical across all themes; each has three interchangeable names (short, long-form, device name):

| short | long-form | device name | value |
| ----- | --------- | ----------- | ----- |
| `xs`  | `x-small` | `mobile`    | 16em  |
| `sm`  | `small`   | `phablet`   | 20em  |
| `md`  | `medium`  | `tablet`    | 30em  |
| `lg`  | `large`   | `laptop`    | 48em  |
| `xl`  | `x-large` | `desktop`   | 62em  |

Two more, unscaled aliases mark the main content area's max-width — hand-authored (not sourced from
the token IR) and **theme-dependent**:

| alias                               | `rebrand`        | `canvas` / `canvasHighContrast` |
| ----------------------------------- | ---------------- | ------------------------------- |
| `--breakpoint-content-*`            | 68.75em (1100px) | 59.25em                         |
| `--breakpoint-content-full-width-*` | 98.75em (1580px) | 59.25em                         |

## API

- `themeCustomMedia(options?): Plugin` - create the lowering plugin.
- default export - `themeCustomMedia`.

## License

MIT
