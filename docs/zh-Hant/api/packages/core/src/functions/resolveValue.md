[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# 函式: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## 參數

### raw

`string`

## 回傳

`string`

## 範例

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
