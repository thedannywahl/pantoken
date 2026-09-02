[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# 函数: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## 参数

### raw

`string`

## 返回值

`string`

## 示例

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
