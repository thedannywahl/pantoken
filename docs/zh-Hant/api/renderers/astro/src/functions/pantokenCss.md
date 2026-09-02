[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# 函式: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha（內測）</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## 參數

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## 回傳

`string`

The CSS string.

## 範例

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
