[pantoken](../../../../index.md) / [packages/core/src](../index.md) / dedupeByName

# دالة: dedupeByName()

> **dedupeByName**(`tokens`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إزالة التكرار من الرموز حسب الاسم، مع الاحتفاظ بآخر حدوث لها (لذلك تفوز الإضافات الأحدث).

## المعلمات

### tokens

[`Token`](../interfaces/Token.md)[]

## القيم المرجعة

[`Token`](../interfaces/Token.md)[]

## مثال

```ts
import { dedupeByName } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const tokens: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
];
dedupeByName(tokens); // → one token, value "#000" (the later wins)
```
