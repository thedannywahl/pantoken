[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# Funktion: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## Parameter

### kebab

`string`

## Rückgabe

`string`

## Beispiel

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
