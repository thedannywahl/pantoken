[pantoken](../../../../index.md) / [packages/core/src](../index.md) / defineToken

# Funció: defineToken()

> **defineToken**(`input`): [`Token`](../interfaces/Token.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix un [Token](../interfaces/Token.md) completament format a partir d'entrada parcial, establint per defecte `inherits` i `syntax`.

## Paràmetres

### input

[`TokenInput`](../interfaces/TokenInput.md)

## Retorna

[`Token`](../interfaces/Token.md)

## Exemples

**Detecta la sintaxi d'un valor concret**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-color-x", value: "#0374B5" });
// → { name: "--instui-color-x", syntax: "<color>", inherits: true, value: "#0374B5" }
```

**Un valor var() únic registra refersTo; un light-dark() estableix tema**

```ts
import { defineToken } from "@pantoken/core";

defineToken({ name: "--instui-brand", value: "var(--instui-color-background-brand)" });
// → syntax "*", refersTo: "--instui-color-background-brand"

defineToken({ name: "--instui-bg", value: "light-dark(#fff, #000)" });
// → syntax "*", themed: true
```
