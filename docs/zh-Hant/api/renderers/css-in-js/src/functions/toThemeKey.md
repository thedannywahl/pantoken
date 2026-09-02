[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# 函式: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## 參數

### name

`string`

## 回傳

`string`

## 範例

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
