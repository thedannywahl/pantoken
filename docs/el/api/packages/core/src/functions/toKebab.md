[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# Συνάρτηση: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Convert a CamelCase / spaced string to kebab-case.

## Παράμετροι

### str

`string`

## Επιστρέφει

`string`

## Παράδειγμα

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
