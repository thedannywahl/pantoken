[pantoken](../../../../index.md) / [formats/components/src](../index.md) / iconGlyphsCss

# دالة: iconGlyphsCss()

> **iconGlyphsCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء ورقة أنماط رموز الأيقونات: فئة `.&lt;prefix&gt;-icon-&lt;name&gt;` واحدة لكل أيقونة تُشير
`--pantoken-glyph` إلى رمز `--instui-icon-&lt;name&gt;` المطابق. تُبقى خارج حزمة المكوّن
(كبيرة الحجم)؛ تُوزّع كـ `icons.css` مستقلة. مرّر أسماء الأيقونات (مثالًا من `@pantoken/icons`).

## المعلمات

### names

للقراءة فقط `string`[]

أسماء الأيقونات بدون بادئة `--instui-icon-` (مثالًا `["megaphone", "check"]`).

### options?

[`IconGlyphsOptions`](../interfaces/IconGlyphsOptions.md) = `{}`

[IconGlyphsOptions](../interfaces/IconGlyphsOptions.md) (يضيف `deprecatedAliases` إلى [ComponentOptions](../interfaces/ComponentOptions.md)).

## القيم المرجعة

`string`

نص CSS.

## مثال

```ts
import { iconGlyphsCss } from "@pantoken/components";
import { icons } from "@pantoken/icons";

const css = iconGlyphsCss(icons.map((i) => i.name)); // .-icon-megaphone { --pantoken-glyph: … }
```

هذا هو نصف نظام الأيقونات الخاص ببتّات الرموز (معدِّلات `.-icon-&lt;name&gt;`، الموزّعة كـ
`icons.css`); الأداة المساعدة `icon` هي النصف الرسّام (الـ `::before` المشتركة). يشتركان في عرض المثال `icon`.

