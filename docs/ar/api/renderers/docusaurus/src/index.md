[pantoken](../../../index.md) / docusaurus

# docusaurus

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/docusaurus` — موضوع موقع Docusaurus برموز Instructure.

تأتي أنماط Docusaurus من Infima، التي تتم قيادة مواضيعها بواسطة متغيرات `--ifm-*` CSS. يشير هذا إلى تلك عند `var(--instui-*)`، لذا فإن إسقاط النتيجة في `src/css/custom.css` (جنباً إلى جنب مع `@pantoken/css`، الذي يحدد الخصائص المخصصة) إعادة تغطية المستندات بمظهر Instructure بينما يستمر light/dark في التدفق من خلال نفس الرموز.

## Interfaces

- [ToDocusaurusCssOptions](interfaces/ToDocusaurusCssOptions.md)

## Variables

- [INFIMA\_TO\_INSTUI](variables/INFIMA_TO_INSTUI.md)
- [docusaurusCss](variables/docusaurusCss.md)

## Functions

- [toDocusaurusCss](functions/toDocusaurusCss.md)

## References

### default

إعادة تسمية وإعادة تصدير [docusaurusCss](variables/docusaurusCss.md)
