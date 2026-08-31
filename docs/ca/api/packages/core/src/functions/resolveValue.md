[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Function: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Resol un valor de token cru: una referència es converteix en `var(...)`; un valor concret passa a través.

## Parameters

### raw

`string`

## Returns

`string`

## Example

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff"); // → "#ffffff"
```
