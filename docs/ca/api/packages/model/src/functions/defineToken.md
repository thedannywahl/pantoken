[pantoken](../../../../index.md) / [packages/model/src](../index.md) / defineToken

# Funció: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construir un [Token](../interfaces/Token.md) ben format a partir d'entrada parcial, establint per defecte `syntax` a `"*"` i
`inherits` a `true`. Els connectors importen això de `@pantoken/model` per evitar dependre de
`@pantoken/core`; per a la inferència intel·ligent de sintaxi CSS, utilitzeu `defineToken` de `@pantoken/core`.

## Paràmetres

### input

[`TokenInput`](../interfaces/TokenInput.md)

## Retorna

[`Token`](../interfaces/Token.md)

## Exemple

```ts
import { defineToken } from "@pantoken/model";

defineToken({ name: "--instui-brand", value: "#0374B5" });
// → { name: "--instui-brand", syntax: "*", inherits: true, value: "#0374B5" }
```
