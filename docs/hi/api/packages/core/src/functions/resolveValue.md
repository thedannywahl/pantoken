[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# फंक्शन: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Resolve a raw token value: a reference becomes `var(...)`; a concrete value passes through.

## पैरामीटर

### raw

`string`

## वापसी

`string`

## उदाहरण

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
