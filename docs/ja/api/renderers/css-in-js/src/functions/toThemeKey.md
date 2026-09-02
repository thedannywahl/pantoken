[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# 関数: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## パラメーター

### name

`string`

## 戻り値

`string`

## 例

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
