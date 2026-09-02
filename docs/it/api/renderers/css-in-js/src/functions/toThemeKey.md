[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Funzione: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Parametri

### name

`string`

## Restituisce

`string`

## Esempio

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
