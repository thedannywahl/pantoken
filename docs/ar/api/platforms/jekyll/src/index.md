[pantoken](../../../index.md) / jekyll

# jekyll

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/jekyll` — انبعاث ورقة أنماط رموز Instructure لموقع Jekyll.

Jekyll ليس لديها عقد متغير مواضيع قياسي، لذا هذا يسلم الرموز كأصول جاهزة للاستخدام:
جزء Sass لـ `_sass/` (استيراده من ورقة الأنماط الرئيسية لديك) وملف CSS عادي لـ
`assets/css/` (من `@pantoken/scss` و `@pantoken/css`)، بالإضافة إلى ورقة أنماط نثر تبدو مثل InstUI
(من `@pantoken/components`) التي تنمط المحتوى في منطقة `.pantoken-prose`.

## Interfaces

- [JekyllFile](interfaces/JekyllFile.md)

## Functions

- [toJekyllAssets](functions/toJekyllAssets.md)
