[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# تابع: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## پارامترها

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## مقدار بازگشتی

`string`

The CSS string.

## نمونه

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
