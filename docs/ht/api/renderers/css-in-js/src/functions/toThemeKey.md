[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Fonksyon: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Paramèt

### name

`string`

## Retounen

`string`

## Egzanp

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
