[pantoken](../../../../index.md) / [formats/dtcg/src](../index.md) / byTheme

# ฟังก์ชัน: byTheme()

> **byTheme**(`theme`): `DtcgDoc`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Look up a theme's DTCG document by name.

## พารามิเตอร์

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## คืนค่า

`DtcgDoc`

## ตัวอย่าง

```ts
import { byTheme } from "@pantoken/dtcg";

const doc = byTheme("canvasHighContrast");
```
