[pantoken](../../../../index.md) / logos

# logos

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-logos` — Instructure-produktlogos som SVG'er, data-URI'er og billedtokens.

Det sælger SVG-logoerne fra Instructure's UX-retningslinjer for Canvas, Mastery, Parchment,
Instructure, LearnPlatform og Ignite AI i standardlayouts (vandret, stablet, ikon)
og farveformater (fuldt farve, farve, mørk, omvendt osv.). Hvert logo er tilgængeligt på tre måder:
det rå SVG ([getLogoSvg](functions/getLogoSvg.md)), en data-URI ([getLogoDataUri](functions/getLogoDataUri.md)) og et
`--instui-logo-&lt;product&gt;-&lt;layout&gt;-&lt;mode&gt;` billedtoken i `@pantoken/plugin-logos/logos.css`.

Som et pantoken-plugin bidrager hooket `css` med disse billedtokens.

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

Omdøber og geneksporterer [logosPlugin](functions/logosPlugin.md)
