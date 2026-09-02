[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# Ֆունկցիա: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Լուծեք raw token արժեք՝ reference դառնում է `var(...)`; concrete արժեք անցնում է:

## Պարամետրեր

### raw

`string`

## Վերադարձվող արժեք

`string`

## Օրինակ

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
