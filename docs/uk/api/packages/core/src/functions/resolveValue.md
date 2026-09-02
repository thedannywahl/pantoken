[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Функція: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## Параметри

### raw

`string`

## Повертає

`string`

## Приклад

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
