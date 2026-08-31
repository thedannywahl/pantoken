[pantoken](../../../../index.md) / [packages/core/src](../index.md) / dedupeByName

# Function: dedupeByName()

> **dedupeByName**(`tokens`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

إزالة التكرار من التوكنات حسب الاسم، مع الاحتفاظ بالمظهر الأخير (بحيث يفوز المكونات الإضافية لاحقًا).

## Parameters

### tokens

[`Token`](../interfaces/Token.md)[]

## Returns

[`Token`](../interfaces/Token.md)[]

## Example

```ts
import { dedupeByName } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const tokens: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
];
dedupeByName(tokens); // → one token, value "#000" (the later wins)
```
