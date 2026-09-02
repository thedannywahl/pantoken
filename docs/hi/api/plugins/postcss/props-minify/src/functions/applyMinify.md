[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / applyMinify

# फंक्शन: applyMinify()

> **applyMinify**(`css`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Apply custom-property minification transforms to a stylesheet string.

Builds a PostCSS plugin array from `options` and runs it synchronously. Plugin order:
`pruneCustomProps` → `flattenProperty` → `mangleCustomProps`. Returns the input unchanged when
no options are set.

## पैरामीटर

### css

`string`

The stylesheet string to transform.

### options?

[`PropsMinifyOptions`](../interfaces/PropsMinifyOptions.md) = `{}`

[PropsMinifyOptions](../interfaces/PropsMinifyOptions.md).

## वापसी

`string`

The transformed CSS string.

## उदाहरण

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```
