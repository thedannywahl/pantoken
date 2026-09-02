[pantoken](../../../../index.md) / [packages/core/src](../index.md) / dedupeByName

# ฟังก์ชัน: dedupeByName()

> **dedupeByName**(`tokens`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

De-duplicate tokens by name, keeping the last occurrence (so later plugins win).

## พารามิเตอร์

### tokens

[`Token`](../interfaces/Token.md)[]

## คืนค่า

[`Token`](../interfaces/Token.md)[]

## ตัวอย่าง

```ts
import { dedupeByName } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const tokens: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
];
dedupeByName(tokens); // → one token, value "#000" (the later wins)
```
