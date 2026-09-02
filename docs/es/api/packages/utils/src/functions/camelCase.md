[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# Función: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## Parámetros

### kebab

`string`

## Devuelve

`string`

## Ejemplo

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
