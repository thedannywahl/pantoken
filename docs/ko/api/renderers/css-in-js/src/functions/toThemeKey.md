[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / toThemeKey

# 함수: toThemeKey()

> **toThemeKey**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Turn `--instui-color-background-brand` into `colorBackgroundBrand`.

## 매개변수

### name

`string`

## 반환값

`string`

## 예제

```ts
import { toThemeKey } from "@pantoken/css-in-js";

toThemeKey("--instui-color-background-brand"); // "colorBackgroundBrand"
```
