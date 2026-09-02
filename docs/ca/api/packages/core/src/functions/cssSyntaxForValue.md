[pantoken](../../../../index.md) / [packages/core/src](../index.md) / cssSyntaxForValue

# Funció: cssSyntaxForValue()

> **cssSyntaxForValue**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Detecta la propietat CSS `@property` `syntax` que un token concret hauria de registrar. Els `type` de Tokens Studio
no es mapegen 1:1 a la sintaxi CSS, de manera que el valor s'inspecciona. Retorna `"*"` (universal) per a
qualsevol cosa que no sigui un token tipificat únic i computacionalment independent.

## Paràmetres

### value

`string`

Un valor concret (sense `var()` / `light-dark()`).

## Retorna

`string`

El descriptor de sintaxi `@property`.

## Exemples

**Valors de token únic tipificats**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("#03893D"); // → "<color>"
cssSyntaxForValue("2px");     // → "<length>"
cssSyntaxForValue("50%");     // → "<percentage>"
cssSyntaxForValue("400");     // → "<integer>"
```

**Les unitats relatives a la font i els valors complexos retroceeixen a universal**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("1rem");                     // → "*" (rem isn't computationally independent)
cssSyntaxForValue("Lato, Helvetica, sans-serif"); // → "*"
cssSyntaxForValue("currentColor");             // → "*"
```
