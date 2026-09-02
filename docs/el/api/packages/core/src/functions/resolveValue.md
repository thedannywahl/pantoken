[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Συνάρτηση: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## Παράμετροι

### raw

`string`

## Επιστρέφει

`string`

## Παράδειγμα

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
