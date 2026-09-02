[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# 函式: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`).

## 參數

### value

`string`

## 回傳

`boolean`

## 範例

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)");            // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff");                // → false
```
