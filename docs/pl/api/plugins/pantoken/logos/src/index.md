[pantoken](../../../../index.md) / logos

# logos

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-logos` — Instructure product logos as SVGs, data URIs, and image tokens.

It vendors the SVG logos from Instructure's UX guidelines for Canvas, Mastery, Parchment,
Instructure, LearnPlatform, and Ignite AI, in the standard layouts (horizontal, stacked, icon)
and color modes (full-color, color, dark, reversed, and so on). Each logo is available three ways:
the raw SVG ([getLogoSvg](functions/getLogoSvg.md)), a data URI ([getLogoDataUri](functions/getLogoDataUri.md)), and a
`--instui-logo-&lt;product&gt;-&lt;layout&gt;-&lt;mode&gt;` image token in `@pantoken/plugin-logos/logos.css`.

As a pantoken plugin, the `css` hook contributes those image tokens.

## Interfejsy

- [LogoMeta](interfaces/LogoMeta.md)
- [LogosOptions](interfaces/LogosOptions.md)

## Aliasy typów

- [Product](type-aliases/Product.md)
- [LogoLayout](type-aliases/LogoLayout.md)
- [LogoColorMode](type-aliases/LogoColorMode.md)

## Zmienne

- [logos](variables/logos.md)
- [products](variables/products.md)
- [logosCss](variables/logosCss.md)

## Funkcje

- [getLogoSvg](functions/getLogoSvg.md)
- [getLogoDataUri](functions/getLogoDataUri.md)
- [logosPlugin](functions/logosPlugin.md)

## Odwołania

### default

Renames and re-exports [logosPlugin](functions/logosPlugin.md)
