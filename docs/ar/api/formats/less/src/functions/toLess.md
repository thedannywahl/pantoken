[pantoken](../../../../index.md) / [formats/less/src](../index.md) / toLess

# دالة: toLess()

> **toLess**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

تصدر متغيرات Less لتمثيل الرموم (IR).

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

تمثيل الرموز (IR) (مثلًا من `@pantoken/tokens`).

### options?

[`ToLessOptions`](../interfaces/ToLessOptions.md) = `{}`

[ToLessOptions](../interfaces/ToLessOptions.md).

## القيم المرجعة

`string`

سلسلة مصدر Less.

## أمثلة

**تصدير المتغيرات الافتراضية (الوضع الفاتح)**

```ts
import { toLess } from "@pantoken/less";
import { tokens } from "@pantoken/tokens";

toLess(tokens); // "@instui-color-brand: #0374b5;\n…"
```

**تحديد وضع الظلام لموضوع آخر**

```ts
import { toLess } from "@pantoken/less";
import { byTheme } from "@pantoken/tokens";

toLess(byTheme("canvas"), { mode: "dark" });
```
