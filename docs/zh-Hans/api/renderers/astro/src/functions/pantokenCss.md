[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# 函数: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## 参数

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## 返回值

`string`

The CSS string.

## 示例

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
