[pantoken](../../../index.md) / css

# css

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/css` — emit Instructure design tokens som `@property`-typet CSS.

[toCss](functions/toCss.md) omdanner ethvert token IR til CSS; [css](variables/css.md) er det parat `rebrand` stylesheet og
[leanCss](variables/leanCss.md) er en lean variant, der dropper det fulde `--instui-icon-*` sæt (de ~1.777 ikon data-URIs
der dominerer arket) til CDN/embed levering — cirka en sjettedel af størrelsen over nettet. Begge bærer
elevation + fokus-outline fundament (sammensatte brugerdefinerede egenskaber hvis rene builders bor i
`@pantoken/utils`), så et komponentark løser sine skygger og fokusring mod tokenarket
alene. Et DOM side-effect element findes på `@pantoken/css/inject`; statiske filer på
`@pantoken/css/style.css` og `@pantoken/css/style.lean.css`.

## Interfaces

- [CssSection](interfaces/CssSection.md)
- [ToCssOptions](interfaces/ToCssOptions.md)

## Variabler

- [css](variables/css.md)
- [leanCss](variables/leanCss.md)

## Funktioner

- [buildCssFile](functions/buildCssFile.md)
- [toCss](functions/toCss.md)

## Referencer

### default

Omdøber og re-eksporterer [css](variables/css.md)
