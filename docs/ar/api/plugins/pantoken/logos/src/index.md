[pantoken](../../../../index.md) / logos

# logos

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-logos` — شعارات منتجات Instructure كملفات SVG وسلاسل بيانات URI ورموز صور.

يوفر شعارات SVG من إرشادات تجربة المستخدم الخاصة بـ Instructure لمنتجات Canvas وMastery وParchment وInstructure وLearnPlatform وIgnite AI، بالتصميمات القياسية (أفقي، مكدس، أيقونة)
وأنماط الألوان (ملون بالكامل، ملون، داكن، معكوس، وما إلى ذلك). كل شعار متاح بثلاث طرق:
الـ SVG الخام ([getLogoSvg](functions/getLogoSvg.md))، وسلسلة بيانات URI ([getLogoDataUri](functions/getLogoDataUri.md))، و
`--instui-logo-&lt;product&gt;-&lt;layout&gt;-&lt;mode&gt;` توكن صورة في `@pantoken/plugin-logos/logos.css`.

باعتباره مكوِّنًا إضافيًا لـ pantoken، يساهم الخطاف `css` بتلك توكنات الصور.

## واجهات

- [LogoMeta](interfaces/LogoMeta.md)
- [LogosOptions](interfaces/LogosOptions.md)

## أسماء أنواع مستعارة

- [Product](type-aliases/Product.md)
- [LogoLayout](type-aliases/LogoLayout.md)
- [LogoColorMode](type-aliases/LogoColorMode.md)

## المتغيرات

- [logos](variables/logos.md)
- [products](variables/products.md)
- [logosCss](variables/logosCss.md)

## الدوال

- [getLogoSvg](functions/getLogoSvg.md)
- [getLogoDataUri](functions/getLogoDataUri.md)
- [logosPlugin](functions/logosPlugin.md)

## المراجع

### default

يعيد تسمية ويعيد تصدير [logosPlugin](functions/logosPlugin.md)
