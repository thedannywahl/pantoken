[pantoken](../../../../index.md) / [formats/stylus/src](../index.md) / toStylus

# دالة: toStylus()

> **toStylus**(`tokens`, `options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إصدار متغيرات Stylus من IR للرموز.

## المعلمات

### tokens

قابل للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

الـ IR (مثلًا من `@pantoken/tokens`).

### options?

[`ToStylusOptions`](../interfaces/ToStylusOptions.md) = `{}`

[ToStylusOptions](../interfaces/ToStylusOptions.md).

## القيم المرجعة

`string`

سلسلة مصدر Stylus.

## أمثلة

**إصدار المتغيرات الافتراضية (الوضع الفاتح)**

```ts
import { toStylus } from "@pantoken/stylus";
import { tokens } from "@pantoken/tokens";

toStylus(tokens); // "instui-color-brand = #0374b5\n…"
```

**حل وضع الظلام لموضوع آخر**

```ts
import { toStylus } from "@pantoken/stylus";
import { byTheme } from "@pantoken/tokens";

toStylus(byTheme("canvas"), { mode: "dark" });
```
