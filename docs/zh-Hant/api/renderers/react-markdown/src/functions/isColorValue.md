[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / isColorValue

# 函式: isColorValue()

> **isColorValue**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

True when a string is a standalone CSS color value (hex or a color function).

## 參數

### value

`string`

## 回傳

`boolean`

## 範例

```ts
import { isColorValue } from "@pantoken/react-markdown";

isColorValue("#03893D"); // true
isColorValue("oklch(0.7 0.1 200)"); // true
isColorValue("hello"); // false
```
