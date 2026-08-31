[pantoken](../../../index.md) / icon-font

# icon-font

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/icon-font` — بناء خط Instructure أيقونات قابل للتثبيت (WOFF2 + TTF) مع
ورقة نمط وخريطة نقطة رمز مطابقة. على عكس مسارات SVG المضمنة، يتم تثبيت الخط على جهاز، لذا
يعمل في تطبيقات التصميم والسياقات غير المتصلة بالإنترنت حيث لا يمكن الوصول إلى أدوات الويب.

تُحول الحروف القائمة على الحدود (Lucide) إلى ملء بحيث تتم عرضها كحروف خط حقيقية؛ الحروف
القائمة على الملء (Instructure مخصص) تمر عبرها.

## Interfaces

- [IconFontResult](interfaces/IconFontResult.md)
- [BuildIconFontOptions](interfaces/BuildIconFontOptions.md)
- [GlyphPath](interfaces/GlyphPath.md)

## Functions

- [buildIconFont](functions/buildIconFont.md)
- [svgToGlyphPath](functions/svgToGlyphPath.md)
