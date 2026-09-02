[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# 함수: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## 매개변수

### raw

`string`

## 반환값

`string`

## 예제

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
