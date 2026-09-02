[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# Funció: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Cert quan un valor no pot ser un valor inicial `@property` tipificat (`var()` / `light-dark()`).

## Paràmetres

### value

`string`

## Retorna

`boolean`

## Exemple

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)");            // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff");                // → false
```
