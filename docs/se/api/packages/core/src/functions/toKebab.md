[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# Fušla: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Convert a CamelCase / spaced string to kebab-case.

## Parametera

### str

`string`

## Gullii / Gávdnat

`string`

## Exempel

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
