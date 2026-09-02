[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# Swyddogaeth: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Convert a CamelCase / spaced string to kebab-case.

## Paramedrau

### str

`string`

## Yn dychwelyd

`string`

## Enghraifft

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
