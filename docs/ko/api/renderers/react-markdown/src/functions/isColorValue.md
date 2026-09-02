[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / isColorValue

# 함수: isColorValue()

> **isColorValue**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

True when a string is a standalone CSS color value (hex or a color function).

## 매개변수

### value

`string`

## 반환값

`boolean`

## 예제

```ts
import { isColorValue } from "@pantoken/react-markdown";

isColorValue("#03893D"); // true
isColorValue("oklch(0.7 0.1 200)"); // true
isColorValue("hello"); // false
```
