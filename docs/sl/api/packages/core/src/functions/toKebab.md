[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# Funkcija: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Convert a CamelCase / spaced string to kebab-case.

## Parametri

### str

`string`

## Vrne

`string`

## Primer

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
