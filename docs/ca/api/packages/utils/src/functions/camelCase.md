[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# Funció: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Converteix una cadena de cas kebab a camelCase (`color-background-brand` → `colorBackgroundBrand`).

## Paràmetres

### kebab

`string`

## Retorna

`string`

## Exemple

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
