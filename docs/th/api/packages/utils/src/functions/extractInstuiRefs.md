[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / extractInstuiRefs

# ฟังก์ชัน: extractInstuiRefs()

> **extractInstuiRefs**(`text`): `Set`\<`string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Every `--instui-*` custom-property name that appears anywhere in `text`.

## พารามิเตอร์

### text

`string`

## คืนค่า

`Set`\<`string`\>

## ตัวอย่าง

```ts
import { extractInstuiRefs } from "@pantoken/utils";

extractInstuiRefs(".b { color: var(--instui-color-text-base); }");
// → Set { "--instui-color-text-base" }
```
