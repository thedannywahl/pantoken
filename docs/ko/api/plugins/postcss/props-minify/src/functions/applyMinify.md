[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / applyMinify

# 함수: applyMinify()

> **applyMinify**(`css`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Apply custom-property minification transforms to a stylesheet string.

Builds a PostCSS plugin array from `options` and runs it synchronously. Plugin order:
`pruneCustomProps` → `flattenProperty` → `mangleCustomProps`. Returns the input unchanged when
no options are set.

## 매개변수

### css

`string`

The stylesheet string to transform.

### options?

[`PropsMinifyOptions`](../interfaces/PropsMinifyOptions.md) = `{}`

[PropsMinifyOptions](../interfaces/PropsMinifyOptions.md).

## 반환값

`string`

The transformed CSS string.

## 예제

```ts
import { applyMinify } from "@pantoken/plugin-props-minify";
const out = applyMinify(css, { prune: true, flatten: true, mangle: true });
```
