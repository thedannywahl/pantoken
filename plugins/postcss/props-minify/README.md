# @pantoken/plugin-css-minify

Composed CSS minification for pantoken stylesheets — flatten `@property` at-rules and mangle
`--instui-*` custom property names via a single `applyMinify` utility.

## Install

```sh
npm i -D @pantoken/plugin-css-minify
```

Also available as `pantoken/cssMinify`.

## Usage

```ts
import { applyMinify } from "@pantoken/plugin-css-minify";

// Self-contained bundle: flatten @property overhead and mangle long names
const minified = applyMinify(css, { flatten: true, mangle: true });

// Separate-file consumer (e.g. @pantoken/css generate script): flatten only
const flattened = applyMinify(css, { flatten: true });
```

## What it does

`applyMinify` runs a single synchronous PostCSS pass applying whichever transforms are enabled:

- **`flatten`** — removes `@property` at-rules and injects `--name: value` declarations into a
  chosen selector (default `:root`). Recovers ~60 bytes of boilerplate per property. See
  [`@pantoken/plugin-flatten-property`](../flatten-property) for the semantic trade-offs.
- **`mangle`** — renames `--instui-*` custom properties to minimal base-26 identifiers
  (`--a`, `--b`, …). Only safe for self-contained bundles. See
  [`@pantoken/plugin-mangle-custom-props`](../mangle-custom-props) for details.

## API

### `applyMinify(css, options?): string`

| Option    | Type                                  | Default | Description                                                                                                                |
| --------- | ------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `flatten` | `boolean \| FlattenPropertyOptions`   | `false` | Apply `flattenProperty`. `true` uses defaults; pass an options object to override (e.g. `{ injectSelector: ":scope" }`).   |
| `mangle`  | `boolean \| MangleCustomPropsOptions` | `false` | Apply `mangleCustomProps`. `true` uses defaults; pass an options object to override (e.g. `{ sharedManifest: manifest }`). |

### Cross-file mangling

```ts
import { applyMinify } from "@pantoken/plugin-css-minify";

const manifest = new Map<string, string>();
// Process token sheet first to seed the manifest.
const tokenCss = applyMinify(rawTokens, { mangle: { sharedManifest: manifest } });
const componentCss = applyMinify(rawComponents, { mangle: { sharedManifest: manifest } });
```

### Re-exports

This package re-exports `flattenProperty`, `mangleCustomProps`, `FlattenPropertyOptions`,
`MangleCustomPropsOptions`, and `MangleMethod` for use in custom PostCSS pipelines.

## Related

- [`@pantoken/plugin-flatten-property`](../flatten-property) — standalone flatten plugin.
- [`@pantoken/plugin-mangle-custom-props`](../mangle-custom-props) — standalone mangle plugin.
- [`@pantoken/plugin-prune-custom-props`](../prune-custom-props) — tree-shakes unused custom
  properties; run this before `applyMinify` for maximum size reduction.

## License

MIT
