[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# دالة: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

حوّل سلسلة بنمط CamelCase أو ذات مسافات إلى kebab-case.

## المعلمات

### str

`string`

## القيم المرجعة

`string`

## مثال

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
