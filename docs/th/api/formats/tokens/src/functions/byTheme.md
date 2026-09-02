[pantoken](../../../../index.md) / [formats/tokens/src](../index.md) / byTheme

# ฟังก์ชัน: byTheme()

> **byTheme**(`theme`): [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Look up a theme's IR by name.

## พารามิเตอร์

### theme

[`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

## คืนค่า

[`Token`](../../../../packages/core/src/interfaces/Token.md)[]

## ตัวอย่าง

```ts
import { byTheme } from "@pantoken/tokens";
import { toScss } from "@pantoken/scss";

toScss(byTheme("canvas"), { mode: "dark" });
```
