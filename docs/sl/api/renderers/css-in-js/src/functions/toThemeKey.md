[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Funkcija: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Parametri

### name

`string`

## Vrne

`string`

## Primer

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
