[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Feidhm: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## Paraiméadair

### raw

`string`

## Tuairisceáin

`string`

## Sampla

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
