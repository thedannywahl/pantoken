[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# Hàm: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## Tham số

### name

`string`

## Trả về

`string`

## Ví dụ

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
