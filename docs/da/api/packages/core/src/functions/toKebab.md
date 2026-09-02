[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# Funktion: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Konverter en CamelCase / afstandstakt streng til kebab-case.

## Parametre

### str

`string`

## Returnerer

`string`

## Eksempel

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
