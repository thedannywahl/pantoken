[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Функция: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Параметры

### name

`string`

## Возвращаемое значение

`string`

## Пример

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
