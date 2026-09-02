[pantoken](../../../../index.md) / [packages/core/src](../index.md) / resolveValue

# دالة: resolveValue()

> **resolveValue**(`raw`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

حل قيمة توكن خام: يصبح المرجع `var(...)`; والقيمة الملموسة تمر كما هي.

## المعلمات

### raw

`string`

## القيم المرجعة

`string`

## مثال

```ts
import { resolveValue } from "@pantoken/core";

resolveValue("{semantic.color.background.base}"); // → "var(--instui-color-background-base)"
resolveValue("#ffffff");                          // → "#ffffff"
```
