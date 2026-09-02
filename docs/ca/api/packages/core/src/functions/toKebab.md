[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# Funció: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Converteix una cadena CamelCase / amb espais a kebab-case.

## Paràmetres

### str

`string`

## Retorna

`string`

## Exemple

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
