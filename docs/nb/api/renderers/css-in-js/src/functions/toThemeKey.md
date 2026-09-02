[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Funksjon: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Parametere

### name

`string`

## Returnerer

`string`

## Eksempel

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
