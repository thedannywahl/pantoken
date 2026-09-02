[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toKebab

# 함수: toKebab()

> **toKebab**(`str`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Convert a CamelCase / spaced string to kebab-case.

## 매개변수

### str

`string`

## 반환값

`string`

## 예제

```ts
import { toKebab } from "@pantoken/core";

toKebab("baseButton");   // → "base-button"
toKebab("Font Family");  // → "font-family"
toKebab("rebrandLight"); // → "rebrand-light"
```
