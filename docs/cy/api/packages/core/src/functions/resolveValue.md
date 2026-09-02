[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Swyddogaeth: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## Paramedrau

### raw

`string`

## Yn dychwelyd

`string`

## Enghraifft

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
