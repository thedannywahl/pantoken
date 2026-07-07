# @pantoken/plugin-font-families

Atkinson Hyperlegible Next — the typeface InstUI uses — as `@font-face` rules and font-family tokens.
The woff2 files ship in the package.

## Install

```sh
npm i @pantoken/plugin-font-families
```

Also available as `pantoken/fontFamilies`.

## Usage

The common case — import the ready stylesheet, then use the family tokens:

```ts
import "@pantoken/plugin-font-families/fonts.css";
```

```css
body {
  font-family: var(--instui-font-family-atkinson-hyperlegible-next);
}
```

As a plugin, when you assemble CSS through `toCss`:

```ts
import { fontFamiliesPlugin } from "@pantoken/plugin-font-families";

const css = toCss(tokens, { plugins: [fontFamiliesPlugin()] });
```

## API

- **`fontFamiliesPlugin(options?)`** — the plugin. Its `css` hook contributes the `@font-face` rules
  plus a `--instui-font-family-<id>` declaration per family. `options.position` (`"prepend"` default
  or `"append"`) places the rules relative to the base stylesheet.
- **`fontFamilies`** — the families, each with its id, CSS name, and faces.
- **`fontFiles`** — every shipped face (family, filename, weight, style).
- **`fontsCss`** — the stylesheet text (the same as the `./fonts.css` export).
- **`./fonts.css`** — the ready `@font-face` + font-family stylesheet, `src` pointing at the shipped
  woff2 files.

## License

MIT — the plugin's code. Atkinson Hyperlegible Next is under the SIL Open Font License.
