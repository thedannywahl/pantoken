[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / isColorValue

# ฟังก์ชัน: isColorValue()

> **isColorValue**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

True when a string is a standalone CSS color value (hex or a color function).

## พารามิเตอร์

### value

`string`

## คืนค่า

`boolean`

## ตัวอย่าง

```ts
import { isColorValue } from "@pantoken/react-markdown";

isColorValue("#03893D"); // true
isColorValue("oklch(0.7 0.1 200)"); // true
isColorValue("hello"); // false
```
