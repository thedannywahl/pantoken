[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# Funktion: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## Parametrar

### kebab

`string`

## Returnerar

`string`

## Exempel

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
