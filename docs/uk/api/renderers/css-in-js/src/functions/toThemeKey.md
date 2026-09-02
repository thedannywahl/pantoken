[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Функція: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Параметри

### name

`string`

## Повертає

`string`

## Приклад

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
