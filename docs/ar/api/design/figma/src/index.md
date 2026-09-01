[pantoken](../../../index.md) / figma

# figma

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/figma` — تحويل تمثيل IR لرموز Instructure إلى حمولة متغيرات Figma.

ينتج مجموعة متغيرات واحدة بوضعيات `light`/`dark`: تتحول رموز الألوان إلى متغيرات `COLOR`
(قيم RGBA من 0–1)، وتصبح الأبعاد/الأعداد `FLOAT`، وكل شيء آخر `STRING`. الأيقونات مستثناة
(ستكون مكونات Figma وليست متغيرات). مرّر [toFigmaVariables](functions/toFigmaVariables.md) إلى مكوّن إضافي لـ Figma
(واجهة برمجة تطبيقات Variables plugin) أو إلى REST API للمتغيرات — يحتوي README على وصلات المكوّن الإضافي.

## واجهات

- [FigmaColor](interfaces/FigmaColor.md)
- [FigmaVariable](interfaces/FigmaVariable.md)
- [FigmaVariablesPayload](interfaces/FigmaVariablesPayload.md)
- [ToFigmaOptions](interfaces/ToFigmaOptions.md)

## الدوال

- [toFigmaColor](functions/toFigmaColor.md)
- [toFigmaVariables](functions/toFigmaVariables.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [toFigmaVariables](functions/toFigmaVariables.md)
