[pantoken](../../../index.md) / jekyll

# jekyll

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/jekyll` — يصدر ملف ورقة أنماط رموز Instructure لموقع Jekyll.

لا يمتلك Jekyll عقدًا معياريًا لمتغيرات السمات، لذا يوفّر هذا الرموز كأصول جاهزة للإدراج:
جزء Sass لـ `_sass/` (استورده من ملف ورقة الأنماط الرئيسي) وملف CSS عادي لـ
`assets/css/` (من `@pantoken/scss` و `@pantoken/css`)، بالإضافة إلى ملف ورقة أنماط نصية بمظهر InstUI
(من `@pantoken/components`) يقوم بتنسيق المحتوى داخل منطقة `.pantoken-prose`.

## واجهات

- [JekyllFile](interfaces/JekyllFile.md)

## الدوال

- [toJekyllAssets](functions/toJekyllAssets.md)
