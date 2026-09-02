[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Functie: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## Parameters

### raw

`string`

## Retourneert

`string`

## Voorbeeld

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
