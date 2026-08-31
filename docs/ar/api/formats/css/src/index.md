[pantoken](../../../index.md) / css

# css

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/css` — إصدار رموز تصميم Instructure كـ CSS من نوع `@property`.

[toCss](functions/toCss.md) يحول أي token IR إلى CSS؛ [css](variables/css.md) هو ورقة النمط الجاهزة `rebrand` و [leanCss](variables/leanCss.md) هو متغير نحيل يسقط المجموعة الكاملة `--instui-icon-*` (بيانات الرموز URIs ~1,777 التي تهيمن على الورقة) لتسليم CDN/embed — ~سادس الحجم عبر السلك. كلاهما يحمل أساس الارتفاع + محيط التركيز (الخصائص المخصصة المركبة التي تعيش منشئوها النقية في `@pantoken/utils`)، لذا تحل ورقة المكون ظلالها وحلقة التركيز ضد ورقة الرمز وحدها. يوجد إدخال تأثير جانبي DOM في `@pantoken/css/inject`؛ الملفات الثابتة في `@pantoken/css/style.css` و `@pantoken/css/style.lean.css`.

## Interfaces

- [CssSection](interfaces/CssSection.md)
- [ToCssOptions](interfaces/ToCssOptions.md)

## Variables

- [css](variables/css.md)
- [leanCss](variables/leanCss.md)

## Functions

- [buildCssFile](functions/buildCssFile.md)
- [toCss](functions/toCss.md)

## References

### default

إعادة تسمية وإعادة تصدير [css](variables/css.md)
