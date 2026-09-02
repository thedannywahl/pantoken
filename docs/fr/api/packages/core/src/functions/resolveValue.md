[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Fonction: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## Paramètres

### raw

`string`

## Renvoie

`string`

## Exemple

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
