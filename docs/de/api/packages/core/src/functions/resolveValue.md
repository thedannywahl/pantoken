[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Funktion: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## Parameter

### raw

`string`

## Rückgabe

`string`

## Beispiel

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
