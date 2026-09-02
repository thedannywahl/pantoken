[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Fungsi: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Parameter

### name

`string`

## Mengembalikan

`string`

## Contoh

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
