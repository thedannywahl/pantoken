[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# 関数: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`).

## パラメーター

### value

`string`

## 戻り値

`boolean`

## 例

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)");            // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff");                // → false
```
