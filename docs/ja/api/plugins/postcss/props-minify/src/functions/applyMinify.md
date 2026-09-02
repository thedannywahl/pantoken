[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / applyMinify

# 関数: applyMinify()

> **applyMinify**(`css`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Apply custom-property minification transforms to a stylesheet string.

Builds a PostCSS plugin array from `options` and runs it synchronously. Plugin order:
`pruneCustomProps` → `flattenProperty` → `mangleCustomProps`. Returns the input unchanged when
no options are set.

## パラメーター

### css

`string`

The stylesheet string to transform.

### options?

[`PropsMinifyOptions`](../interfaces/PropsMinifyOptions.md) = `{}`

[PropsMinifyOptions](../interfaces/PropsMinifyOptions.md).

## 戻り値

`string`

The transformed CSS string.

## 例

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```
