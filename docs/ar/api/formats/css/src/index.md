[pantoken](../../../index.md) / css

# css

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/css` — يصدر رموز تصميم Instructure كـ CSS من نوع `@property`.

[toCss](functions/toCss.md) يحول أي IR للرموز إلى CSS؛ [css](variables/css.md) هو ورقة الأنماط الجاهزة من نوع `rebrand` و
[leanCss](variables/leanCss.md) هو إصدار مُختصر يَسقط مجموعة `--instui-icon-*` الكاملة (حوالي 1,777 من بيانات أيقونات data-URI
التي تهيمن على الورقة) لتسليم عبر CDN/التضمين — حوالي سدس الحجم على الشبكة. كلاهما يحملان
أساس الارتفاع + حدود التركيز (خصائص مركبة منشئوها النقي موجودون في
`@pantoken/utils`), لذا تحل ورقة المكوّن ظلالها وحلقة التركيز مقابل ورقة الرموز
فقط. مدخل أثر DOM موجود في `@pantoken/css/inject`; والملفات الثابتة في
`@pantoken/css/style.css` و `@pantoken/css/style.lean.css`.

## واجهات

- [CssSection](interfaces/CssSection.md)
- [ToCssOptions](interfaces/ToCssOptions.md)

## المتغيرات

- [css](variables/css.md)
- [leanCss](variables/leanCss.md)

## الدوال

- [buildCssFile](functions/buildCssFile.md)
- [toCss](functions/toCss.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [css](variables/css.md)
