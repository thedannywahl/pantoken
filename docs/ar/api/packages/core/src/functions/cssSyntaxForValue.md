[pantoken](../../../../index.md) / [packages/core/src](../index.md) / cssSyntaxForValue

# دالة: cssSyntaxForValue()

> **cssSyntaxForValue**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اكتشاف الـ CSS `@property` `syntax` الذي يجب أن يُسجل التوكن المحدد تحته. Tokens Studio
`type`s لا تُطابق تركيب CSS بنسبة 1:1، لذا تُفحص القيمة. تُعيد `"*"` (عام) لأي شيء ليس توكنًا مفردًا مُصنّفًا ومستقلاً حسابيًا.

## المعلمات

### value

`string`

قيمة مُحددة (بدون `var()` / `light-dark()`).

## القيم المرجعة

`string`

وصف بناء جملة `@property`.

## أمثلة

**قِيَم التوكن المفردة المُصنّفة**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("#03893D"); // → "<color>"
cssSyntaxForValue("2px");     // → "<length>"
cssSyntaxForValue("50%");     // → "<percentage>"
cssSyntaxForValue("400");     // → "<integer>"
```

**الوحدات النسبية إلى الخط والقيم المعقدة تعود إلى العام**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("1rem");                     // → "*" (rem isn't computationally independent)
cssSyntaxForValue("Lato, Helvetica, sans-serif"); // → "*"
cssSyntaxForValue("currentColor");             // → "*"
```
