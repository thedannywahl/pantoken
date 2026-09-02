[pantoken](../../../index.md) / docusaurus

# docusaurus

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/docusaurus` — تطبيق سمة لموقع Docusaurus باستخدام رموز Instructure.

تأتي أنماط Docusaurus من Infima، التي تُدار سماتها عبر متغيرات CSS الخاصة بـ `--ifm-*`. هذا
يُوجّه تلك المتغيرات إلى `var(--instui-*)`، لذا فإن وضع الناتج في `src/css/custom.css` (جنبًا إلى جنب مع
`@pantoken/css`، الذي يعرّف الخصائص المخصصة) يعيد تصميم الوثائق بمظهر Instructure
بينما يستمر تبديل الوضع الفاتح/الداكن عبر نفس الرموز.

## واجهات

- [ToDocusaurusCssOptions](interfaces/ToDocusaurusCssOptions.md)

## المتغيرات

- [INFIMA\_TO\_INSTUI](variables/INFIMA_TO_INSTUI.md)
- [docusaurusCss](variables/docusaurusCss.md)

## الدوال

- [toDocusaurusCss](functions/toDocusaurusCss.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [docusaurusCss](variables/docusaurusCss.md)
