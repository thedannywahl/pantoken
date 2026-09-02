[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# फंक्शन: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Convert a kebab-case string to camelCase (`color-background-brand` → `colorBackgroundBrand`).

## पैरामीटर

### kebab

`string`

## वापसी

`string`

## उदाहरण

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
