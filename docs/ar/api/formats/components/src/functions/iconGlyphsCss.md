[pantoken](../../../../index.md) / [formats/components/src](../index.md) / iconGlyphsCss

# Function: iconGlyphsCss()

> **iconGlyphsCss**(`names`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء ورقة أنماط الرموز الرسومية: فئة `.&lt;prefix&gt;-icon-&lt;name&gt;` واحدة لكل أيقونة تشير
`--pantoken-glyph` إلى رمز `--instui-icon-&lt;name&gt;` المطابق. مبقى خارج حزمة المكون
(إنها كبيرة)؛ يشحن كـ `icons.css` خاص به. مرر أسماء الأيقونات (على سبيل المثال من `@pantoken/icons`).

## Parameters

### names

readonly `string`[]

أسماء الأيقونات بدون بادئة `--instui-icon-` (على سبيل المثال `["megaphone", "check"]`).

### options?

[`IconGlyphsOptions`](../interfaces/IconGlyphsOptions.md) = `{}`

[IconGlyphsOptions](../interfaces/IconGlyphsOptions.md) (يضيف `deprecatedAliases` إلى [ComponentOptions](../interfaces/ComponentOptions.md)).

## Returns

`string`

سلسلة CSS.

## Example

```ts
import { iconGlyphsCss } from "@pantoken/components";
import { icons } from "@pantoken/icons";

const css = iconGlyphsCss(icons.map((i) => i.name)); // .-icon-megaphone { --pantoken-glyph: … }
```

هذا هو النصف الخاص برموز الصور من نظام الأيقونات (معدّلات `.-icon-&lt;name&gt;`، يتم شحنها كـ
`icons.css`); أداة `icon` هي النصف الخاص بالرسام (`::before` المشترك). يشاركان عرض `icon`
التوضيحي.
