[pantoken](../../../index.md) / figma

# figma

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/figma` — تحويل Instructure token IR إلى Figma Variables payload.

ينتج مجموعة متغيرة واحدة مع أوضاع `light`/`dark`: تصبح رموز الألوان متغيرات `COLOR`
(RGBA 0–1)، والأبعاد/الأرقام تصبح `FLOAT`، كل شيء آخر `STRING`. يتم استبعاد الرموز
(ستكون مكونات Figma وليس متغيرات). مرر [toFigmaVariables](functions/toFigmaVariables.md) إلى مكون إضافي Figma
(API متغيرات المكون) أو Variables REST API — README يحتوي على glue المكون الإضافي.

## Interfaces

- [FigmaColor](interfaces/FigmaColor.md)
- [FigmaVariable](interfaces/FigmaVariable.md)
- [FigmaVariablesPayload](interfaces/FigmaVariablesPayload.md)
- [ToFigmaOptions](interfaces/ToFigmaOptions.md)

## Functions

- [toFigmaColor](functions/toFigmaColor.md)
- [toFigmaVariables](functions/toFigmaVariables.md)

## References

### default

يعيد تسمية وإعادة تصدير [toFigmaVariables](functions/toFigmaVariables.md)
