[pantoken](../../../../index.md) / [packages/core/src](../index.md) / defineToken

# Ֆունկցիա: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կառուցեք լիովին ձևավորված [Token](../interfaces/Token.md) մասնակի input-ից, լռելյալ `inherits` և `syntax`:

## Պարամետրեր

### input

[`TokenInput`](../interfaces/TokenInput.md)

## Վերադարձվող արժեք

[`Token`](../interfaces/Token.md)

## Օրինակներ

**Որոշեք syntax concrete արժեքից**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-color-x", value: "#0374B5" });
// → { name: "--instui-color-x", syntax: "<color>", inherits: true, value: "#0374B5" }
```

**Միայնակ var() արժեք գրանցում է refersTo; light-dark() սահմանում է themed**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-brand", value: "var(--instui-color-background-brand)" });
// → syntax "*", refersTo: "--instui-color-background-brand"

defineToken({ name: "--instui-bg", value: "light-dark(#fff, #000)" });
// → syntax "*", themed: true
```
