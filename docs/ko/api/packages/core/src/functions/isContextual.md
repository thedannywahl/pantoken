[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# 함수: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`).

## 매개변수

### value

`string`

## 반환값

`boolean`

## 예제

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)");            // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff");                // → false
```
