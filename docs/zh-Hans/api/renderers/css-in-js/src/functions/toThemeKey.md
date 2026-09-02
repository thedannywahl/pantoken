[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# 函数: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## 参数

### name

`string`

## 返回值

`string`

## 示例

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
