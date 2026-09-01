[pantoken](../../../../index.md) / [formats/scss/src](../index.md) / toScss

# دالة: toScss()

> **toScss**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إخراج متغيرات SCSS لتمثيل الرموز (IR).

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

تمثيل IR (على سبيل المثال من `@pantoken/tokens`).

### options?

[`ToScssOptions`](../interfaces/ToScssOptions.md) = `{}`

[ToScssOptions](../interfaces/ToScssOptions.md).

## القيم المرجعة

`string`

سلسلة مصدر SCSS.

## أمثلة

**إصدار المتغيرات الافتراضية (الوضع الفاتح)**

```ts
import { toScss } from "@pantoken/scss";
import { tokens } from "@pantoken/tokens";

toScss(tokens); // "$instui-color-brand: #0374b5;\n…"
```

**تحديد وضع الظلام لموضوع آخر**

```ts
import { toScss } from "@pantoken/scss";
import { byTheme } from "@pantoken/tokens";

toScss(byTheme("canvas"), { mode: "dark" });
```
