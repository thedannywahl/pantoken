[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / camelCase

# دالة: camelCase()

> **camelCase**(`kebab`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

حوّل سلسلة بصيغة kebab-case إلى camelCase (`color-background-brand` → `colorBackgroundBrand`).

## المعلمات

### kebab

`string`

## القيم المرجعة

`string`

## مثال

```ts
import { camelCase } from "@pantoken/utils";

camelCase("color-background-brand"); // → "colorBackgroundBrand"
```
