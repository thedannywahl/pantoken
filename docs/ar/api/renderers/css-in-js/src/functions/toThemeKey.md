[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# دالة: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

حوّل `--instui-color-background-brand` إلى `colorBackgroundBrand`.

## المعلمات

### name

`string`

## القيم المرجعة

`string`

## مثال

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
