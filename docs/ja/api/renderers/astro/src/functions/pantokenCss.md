[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# 関数: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">アルファ</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## パラメーター

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## 戻り値

`string`

The CSS string.

## 例

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
