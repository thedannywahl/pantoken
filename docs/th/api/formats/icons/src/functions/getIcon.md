[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / getIcon

# ฟังก์ชัน: getIcon()

> **getIcon**(`name`): [`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Look up an icon by name.

## พารามิเตอร์

### name

`string`

## คืนค่า

[`PantokenIcon`](../interfaces/PantokenIcon.md) \| `undefined`

## ตัวอย่าง

```ts
import { getIcon } from "@pantoken/icons";

const icon = getIcon("arrow-left");
icon?.viewBox; // "0 0 24 24"
```
