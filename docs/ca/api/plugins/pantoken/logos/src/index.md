[pantoken](../../../../index.md) / logos

# logos

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-logos` — Logotips de productes Instructure com SVGs, URIs de dades i tokens de imatge.

Distribueix els logotips SVG de les directrius UX de l'Instructure per a Canvas, Mastery, Parchment,
Instructure, LearnPlatform i Ignite AI, en els dissenys estàndard (horitzontal, apilat, icona)
i modes de color (a tot color, color, fosc, invers, i així successivament). Cada logotip està disponible de tres maneres:
l'SVG brut ([getLogoSvg](functions/getLogoSvg.md)), una URI de dades ([getLogoDataUri](functions/getLogoDataUri.md)), i un
token de la imatge `--instui-logo-&lt;product&gt;-&lt;layout&gt;-&lt;mode&gt;` a `@pantoken/plugin-logos/logos.css`.

Com a connector pantoken, el ganxo `css` contribueix als tokens de la imatge.

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

Canvia el nom i re-exporta [logosPlugin](functions/logosPlugin.md)
