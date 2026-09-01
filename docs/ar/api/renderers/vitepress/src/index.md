[pantoken](../../../index.md) / vitepress

# vitepress

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/vitepress` — قم بتصميم موقع VitePress باستخدام توكنات Instructure.

يتم تشغيل تهيئة VitePress بواسطة متغيرات CSS الخاصة بـ `--vp-*`. هذا يوجّهها إلى `var(--instui-*)`، لذا
وضع المخرجات في `.vitepress/theme/custom.css` (بجانب `@pantoken/css`، الذي يعرّف الخصائص المخصصة) يعيد تهيئة الوثائق بمظهر Instructure بينما يظل نمطا الضوء/الظلام
يعتمدان على نفس التوكنات.

## واجهات

- [ToVitePressCssOptions](interfaces/ToVitePressCssOptions.md)

## المتغيرات

- [VITEPRESS\_TO\_INSTUI](variables/VITEPRESS_TO_INSTUI.md)
