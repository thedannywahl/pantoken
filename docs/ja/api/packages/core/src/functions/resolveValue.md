[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# 関数: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## パラメーター

### raw

`string`

## 戻り値

`string`

## 例

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
