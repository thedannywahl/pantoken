[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Funktion: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Parametrar

### name

`string`

## Returnerar

`string`

## Exempel

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
