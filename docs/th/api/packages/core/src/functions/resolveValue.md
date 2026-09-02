[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# ฟังก์ชัน: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## พารามิเตอร์

### raw

`string`

## คืนค่า

`string`

## ตัวอย่าง

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
