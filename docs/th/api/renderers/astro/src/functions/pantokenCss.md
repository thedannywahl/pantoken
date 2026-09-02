[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# ฟังก์ชัน: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## พารามิเตอร์

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## คืนค่า

`string`

The CSS string.

## ตัวอย่าง

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
