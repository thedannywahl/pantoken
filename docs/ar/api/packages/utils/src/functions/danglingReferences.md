[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / danglingReferences

# Function: danglingReferences()

> **danglingReferences**(`css`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

فحص الاحتواء الذاتي: `--instui-*` الأسماء المرجعية عبر `var()` في ورقة نمط لم تفعل أبداً
تحديد (كـ `@property` التسجيل أو `--x:` الإعلان). تم الفرز؛ فارغ يعني كل
مرجع يتحل ضمن نفس الإخراج. استخدم لأوراق الأنماط المستقلة بذاتها (css، pendo).

## Parameters

### css

`string`

ورقة الأنماط المولدة.

## Returns

`string`[]

أسماء المراجع المعلقة.

## Example

```ts
import { danglingReferences } from "@pantoken/utils";

// Self-contained: the referenced property is also defined here.
danglingReferences("@property --instui-a {} .b { color: var(--instui-a); }"); // → []

// Dangling: `--instui-b` is referenced but never defined.
danglingReferences(
  ":root { --instui-a: red; } .b { color: var(--instui-a); background: var(--instui-b); }",
); // → ["--instui-b"]
```
