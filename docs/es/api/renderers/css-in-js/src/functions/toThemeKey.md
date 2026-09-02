[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Función: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Parámetros

### name

`string`

## Devuelve

`string`

## Ejemplo

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
