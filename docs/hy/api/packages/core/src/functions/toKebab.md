[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# Function: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Convert CamelCase / spaced string kebab-case-ի:

## Parameters

### str

`string`

## Returns

`string`

## Example

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton"); // → "base-button"
toKebab("Font Family"); // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
