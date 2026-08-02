# @pantoken/plugin-mangle-custom-props

A PostCSS plugin that renames long custom property names to minimal sequential identifiers.

## Install

```sh
npm i -D @pantoken/plugin-mangle-custom-props postcss
```

Also available as `pantoken/mangleCustomProps`.

## Usage

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

## What it does

Token names like `--instui-component-alert-border-top-style` are human-readable but expensive in
minified bundles — the name itself is 40+ bytes, repeated in the definition, every `var()` call,
and every `@property` registration. This plugin replaces every matching name with a minimal
identifier (`--a`, `--b`, …, `--z`, `--aa`, …), cutting name overhead by ~90%.

Names are collected from the full stylesheet, sorted alphabetically for a deterministic mapping,
then assigned sequentially. The plugin is **only safe for self-contained bundles** where all
`var()` references and their definitions live in the same output. For separate-file consumers
(e.g. `@pantoken/css` and `@pantoken/components` loaded independently), their individual mangle
maps would differ and break cross-file `var()` resolution.

### Cross-file mangling with `sharedManifest`

Pass the same `Map` instance to every call that processes files loaded together. The first pass
seeds the map; subsequent passes reuse existing entries and continue the counter for new names.
Process the token sheet first.

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const manifest = new Map<string, string>();
const tokenCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(tokens, {
  from: undefined,
}).css;
const componentCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(
  components,
  { from: undefined },
).css;
// both files use the same --instui-* → --a mapping
```

## API

### `mangleCustomProps(options?): Plugin`

| Option           | Type                                | Default       | Description                                                                                                                                          |
| ---------------- | ----------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`         | `string`                            | `"--instui-"` | Only names starting with this string are mangled.                                                                                                    |
| `method`         | `"base26" \| "base36" \| "numeric"` | `"base26"`    | Short-name generation strategy. `base26`: `--a`, `--b`, …, `--z`, `--aa`, … `base36`: `--0`…`--9`, `--a`…`--z`, `--10`, … `numeric`: `--0`, `--1`, … |
| `propertyMap`    | `boolean`                           | `false`       | When `true`, appends `{ type: "mangle-map", plugin: "pantoken-mangle-custom-props", map: Map<string,string> }` to PostCSS `result.messages`.         |
| `sharedManifest` | `Map<string, string>`               | —             | Mutable map shared across passes for cross-file consistent mangling.                                                                                 |

## Related

- [`@pantoken/plugin-css-minify`](../css-minify) — composed utility that runs this plugin and
  `@pantoken/plugin-flatten-property` in one pass via `applyMinify`.
- [`@pantoken/plugin-flatten-property`](../flatten-property) — removes `@property` at-rule boilerplate.

## License

MIT
