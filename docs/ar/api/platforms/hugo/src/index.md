[pantoken](../../../index.md) / hugo

# hugo

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/hugo` — إخراج ورقة أنماط رموز Instructure لموقع Hugo.

ليس لدى Hugo عقد معياري لمتغيرات السمات، لذا يقدّم هذا الرموز كأصول جاهزة للاستخدام
تحت `assets/` (حيث يلتقطها Hugo Pipes / Dart Sass): مكوّن Sass جزئي وملف CSS عادي
(من `@pantoken/scss` و `@pantoken/css`), بالإضافة إلى ورقة أنماط نصية بمظهر InstUI (من
`@pantoken/components`) تقوم بتنسيق المحتوى داخل منطقة `.pantoken-prose`.

## واجهات

- [HugoFile](interfaces/HugoFile.md)

## الدوال

- [toHugoAssets](functions/toHugoAssets.md)
