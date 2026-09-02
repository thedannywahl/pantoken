[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# ฟังก์ชัน: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Convert a CamelCase / spaced string to kebab-case.

## พารามิเตอร์

### str

`string`

## คืนค่า

`string`

## ตัวอย่าง

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
