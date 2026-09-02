[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Fonction: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Paramètres

### name

`string`

## Retourne

`string`

## Exemple

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
