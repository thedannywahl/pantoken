# @pantoken/plugin-flatten-property

A PostCSS plugin that converts `@property` at-rules to plain custom-property declarations.

## Install

```sh
npm i -D @pantoken/plugin-flatten-property postcss
```

Also available as `pantoken/flattenProperty`.

## Usage

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

## What it does

`@property` at-rules register typed CSS custom properties with `syntax`, `inherits`, and
`initial-value` descriptors. Each registration carries ~60 bytes of boilerplate overhead per
property. For self-contained bundles (embedded widgets, scoped stylesheets) where CSS type
registration provides no runtime benefit, this plugin replaces each `@property` block with a
simple `--name: value` declaration inside a chosen selector.

**Semantic note:** removing `@property` loses CSS type registration. Typed
transitions/animations, `@starting-style`, and the CSS Typed OM depend on it. Only apply this
plugin to bundles where those semantics are not needed.

## API

### `flattenProperty(options?): Plugin`

| Option                  | Type                 | Default    | Description                                                                                                                       |
| ----------------------- | -------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `injectSelector`        | `string`             | `":root"`  | Selector of the rule that receives the extracted declarations. Use `":scope"` inside an `@scope` block.                           |
| `onMissingInitialValue` | `"remove" \| "keep"` | `"remove"` | What to do with `@property` rules that have no `initial-value` descriptor. `"remove"` drops them; `"keep"` leaves them untouched. |

## Related

- [`@pantoken/plugin-css-minify`](../css-minify) — composed utility that runs this plugin and
  `@pantoken/plugin-mangle-custom-props` in one pass via `applyMinify`.
- [`@pantoken/plugin-mangle-custom-props`](../mangle-custom-props) — renames long `--instui-*`
  custom property names to minimal identifiers.

## License

MIT
