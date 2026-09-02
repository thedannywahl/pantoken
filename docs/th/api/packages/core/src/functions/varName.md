[pantoken](../../../../index.md) / [packages/core/src](../index.md) / varName

# ฟังก์ชัน: varName()

> **varName**(`prefix`, `path`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Build a `--instui-[prefix-]<kebab path>` custom-property name.

## พารามิเตอร์

### prefix

`string`

### path

`string`[]

## คืนค่า

`string`

## ตัวอย่าง

```ts
import { varName } from "@pantoken/core";

varName("primitive", ["color", "white"]);       // → "--instui-primitive-color-white"
varName("", ["spacing", "spaceMd"]);             // → "--instui-spacing-space-md"
varName("component", ["baseButton", "primaryBackground"]);
// → "--instui-component-base-button-primary-background"
```
