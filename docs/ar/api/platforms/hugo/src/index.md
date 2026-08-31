[pantoken](../../../index.md) / hugo

# hugo

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/hugo` — انبعاث ورقة أنماط رموز Instructure لموقع Hugo.

Hugo ليس لديها عقد متغير مواضيع قياسي، لذا هذا يسلم الرموز كأصول جاهزة للاستخدام
تحت `assets/` (حيث يختارها Hugo Pipes / Dart Sass): جزء Sass وملف CSS عادي
(من `@pantoken/scss` و `@pantoken/css`)، بالإضافة إلى ورقة أنماط نثر تبدو مثل InstUI (من
`@pantoken/components`) التي تنمط المحتوى في منطقة `.pantoken-prose`.

## Interfaces

- [HugoFile](interfaces/HugoFile.md)

## Functions

- [toHugoAssets](functions/toHugoAssets.md)
