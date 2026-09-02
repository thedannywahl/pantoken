[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# ฟังก์ชัน: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`).

## พารามิเตอร์

### value

`string`

## คืนค่า

`boolean`

## ตัวอย่าง

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)");            // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff");                // → false
```
