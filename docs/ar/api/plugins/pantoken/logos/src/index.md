[pantoken](../../../../index.md) / logos

# logos

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-logos` — شعارات منتجات Instructure كـ SVGs و URIs ورموز صور.

إنه يوفر شعارات SVG من إرشادات UX الخاصة بـ Instructure لـ Canvas و Mastery و Parchment و Instructure و LearnPlatform و Ignite AI، في التخطيطات القياسية (أفقي، مكدس، رمز) وأوضاع اللون (ألوان كاملة، لون، مظلم، معكوس، وما إلى ذلك). كل شعار متاح بثلاث طرق: SVG الخام ([getLogoSvg](functions/getLogoSvg.md))، و data URI ([getLogoDataUri](functions/getLogoDataUri.md))، و رمز صورة `--instui-logo-&lt;product&gt;-&lt;layout&gt;-&lt;mode&gt;` في `@pantoken/plugin-logos/logos.css`.

كمكون إضافي pantoken، يساهم `css` hook برموز الصور تلك.

## Interfaces

- [LogoMeta](interfaces/LogoMeta.md)
- [LogosOptions](interfaces/LogosOptions.md)

## Type Aliases

- [Product](type-aliases/Product.md)
- [LogoLayout](type-aliases/LogoLayout.md)
- [LogoColorMode](type-aliases/LogoColorMode.md)

## Variables

- [logos](variables/logos.md)
- [products](variables/products.md)
- [logosCss](variables/logosCss.md)

## Functions

- [getLogoSvg](functions/getLogoSvg.md)
- [getLogoDataUri](functions/getLogoDataUri.md)
- [logosPlugin](functions/logosPlugin.md)

## References

### default

إعادة تسمية وإعادة تصدير [logosPlugin](functions/logosPlugin.md)
