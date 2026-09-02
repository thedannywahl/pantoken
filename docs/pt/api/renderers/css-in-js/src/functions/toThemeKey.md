[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Função: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Parâmetros

### name

`string`

## Retorna

`string`

## Exemplo

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
