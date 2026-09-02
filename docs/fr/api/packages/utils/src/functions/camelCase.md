[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# Fonction: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## Paramètres

### kebab

`string`

## Renvoie

`string`

## Exemple

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
