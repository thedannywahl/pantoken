[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Fušla: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## Parametera

### raw

`string`

## Gullii / Gávdnat

`string`

## Exempel

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
