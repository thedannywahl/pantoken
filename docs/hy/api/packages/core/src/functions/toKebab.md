[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# Ֆունկցիա: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Convert CamelCase / spaced string kebab-case-ի:

## Պարամետրեր

### str

`string`

## Վերադարձվող արժեք

`string`

## Օրինակ

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
