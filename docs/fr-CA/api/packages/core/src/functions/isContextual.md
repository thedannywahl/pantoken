[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# Fonction: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`).

## Paramètres

### value

`string`

## Retourne

`boolean`

## Exemple

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)");            // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff");                // → false
```
