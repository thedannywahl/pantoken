[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# Feidhm: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Convert a CamelCase / spaced string to kebab-case.

## Paraiméadair

### str

`string`

## Tuairisceáin

`string`

## Sampla

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
