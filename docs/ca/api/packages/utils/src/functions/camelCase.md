[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# Function: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Converteix una cadena de cas kebab a camelCase (`color-background-brand` → `colorBackgroundBrand`).

## Parameters

### kebab

`string`

## Returns

`string`

## Example

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
