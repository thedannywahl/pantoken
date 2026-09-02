[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# Funktion: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Konverter en kebab-case streng til camelCase (`color-background-brand` → `colorBackgroundBrand`).

## Parametre

### kebab

`string`

## Returnerer

`string`

## Eksempel

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
