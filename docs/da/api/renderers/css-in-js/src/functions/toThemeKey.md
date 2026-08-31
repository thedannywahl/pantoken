[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Function: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Gør `--instui-color-background-brand` til `colorBackgroundBrand`.

## Parameters

### name

`string`

## Returns

`string`

## Example

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
