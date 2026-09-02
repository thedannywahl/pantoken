[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# फंक्शन: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Convert a CamelCase / spaced string to kebab-case.

## पैरामीटर

### str

`string`

## वापसी

`string`

## उदाहरण

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
