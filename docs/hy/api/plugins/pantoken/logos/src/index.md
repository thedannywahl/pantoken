[pantoken](../../../../index.md) / logos

# logos

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-logos` — Instructure ապրանքի լոգոներ որպես SVG, տվյալ URI և պատկեր տոկեններ:

Այն վաճառում է SVG լոգոներ Instructure-ի UX ուղեցույցից Canvas, Mastery, Parchment, Instructure, LearnPlatform և Ignite AI, ստանդարտ դասավորումներում (հորիզոնական, շարագծ, պատկերակ) և գույնի ռեժիմներում (լիի գույն, գույն, մութ, շրջված և այլն): Յուրաքանչյուր լոգո հասանելի է երեք ձևով՝ հում SVG ([getLogoSvg](functions/getLogoSvg.md)), տվյալ URI ([getLogoDataUri](functions/getLogoDataUri.md)) և `--instui-logo-&lt;product&gt;-&lt;layout&gt;-&lt;mode&gt;` պատկեր տոկեն `@pantoken/plugin-logos/logos.css`-ում:

Որպես pantoken բնակիչ, `css` կոկորը նպաստում է այդ պատկեր տոկեններին:

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

Վերանվանում և վերահաստատում է [logosPlugin](functions/logosPlugin.md)
