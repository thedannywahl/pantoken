[pantoken](../../../index.md) / icon-font

# icon-font

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/icon-font` — بناء خط أيقونات قابل للتثبيت من Instructure (WOFF2 + TTF) مع ورقة أنماط
ومتعلّم نقاط الترميز المقابل. على عكس مسارات SVG المضمنة، يُثبَّت الخط على الجهاز، لذلك
يعمل في تطبيقات التصميم وفي السيناريوهات دون اتصال حيث لا تكون أدوات الويب متاحة.

تُحوَّل الرموز المبنية على السكتة (Lucide) من حدود إلى تعبئة لكي تُعرض كرموز خط حقيقية؛ الرموز المبنية على
التعبئة (Instructure custom) تُمرّر كما هي.

## واجهات

- [IconFontResult](interfaces/IconFontResult.md)
- [BuildIconFontOptions](interfaces/BuildIconFontOptions.md)
- [GlyphPath](interfaces/GlyphPath.md)

## الدوال

- [buildIconFont](functions/buildIconFont.md)
- [svgToGlyphPath](functions/svgToGlyphPath.md)
