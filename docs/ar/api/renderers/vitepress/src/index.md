[pantoken](../../../index.md) / vitepress

# vitepress

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/vitepress` — تطبيق نمط على موقع VitePress باستخدام رموز Instructure.

يتم تشغيل نمط VitePress بواسطة متغيرات CSS `--vp-*`. هذا يوجهها إلى `var(--instui-*)`، لذا
عند إسقاط الإخراج إلى `.vitepress/theme/custom.css` (جنباً إلى جنب مع `@pantoken/css`، الذي يحدد
الخصائص المخصصة) يعيد تصميم المستندات بمظهر Instructure بينما يستمر الضوء/الظلام في التدفق
عبر نفس الرموز.

## Interfaces

- [ToVitePressCssOptions](interfaces/ToVitePressCssOptions.md)

## Variables

- [VITEPRESS\_TO\_INSTUI](variables/VITEPRESS_TO_INSTUI.md)
