[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Funktion: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Løs en rå token-værdi: en reference bliver `var(...)`; en konkret værdi passerer gennem.

## Parametre

### raw

`string`

## Returnerer

`string`

## Eksempel

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
