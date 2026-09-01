[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / danglingReferences

# دالة: danglingReferences()

> **danglingReferences**(`css`): `string`[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

فحص الاكتفاء الذاتي: الأسماء `--instui-*` المشار إليها عبر `var()` في ورقة أنماط لا تُعرّفها أبدًا (كـ `@property` تسجيل أو `--x:` تعريف). مرتبة؛ الفارغة تعني أن كل
مرجع يحل ضمن نفس المخرَج. استخدمها لورقات الأنماط المكتفية ذاتيًا (css, pendo).

## المعلمات

### css

`string`

ورقة الأنماط المولَّدة.

## القيم المرجعة

`string`[]

أسماء المراجع المعلقة.

## مثال

```ts
import { danglingReferences } from "@pantoken/utils";

// Self-contained: the referenced property is also defined here.
danglingReferences("@property --instui-a {} .b { color: var(--instui-a); }"); // → []

// Dangling: `--instui-b` is referenced but never defined.
danglingReferences(
  ":root { --instui-a: red; } .b { color: var(--instui-a); background: var(--instui-b); }",
); // → ["--instui-b"]
```
