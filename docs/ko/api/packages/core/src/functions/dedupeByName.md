[pantoken](../../../../index.md) / [packages/core/src](../index.md) / dedupeByName

# 함수: dedupeByName()

> **dedupeByName**(`tokens`): [`Token`](../interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

De-duplicate tokens by name, keeping the last occurrence (so later plugins win).

## 매개변수

### tokens

[`Token`](../interfaces/Token.md)[]

## 반환값

[`Token`](../interfaces/Token.md)[]

## 예제

```ts
import { dedupeByName } from "@pantoken/core";
import type { Token } from "@pantoken/model";

const tokens: Token[] = [
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
  { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
];
dedupeByName(tokens); // → one token, value "#000" (the later wins)
```
