[pantoken](../../../index.md) / css

# css

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/css` — emet tokens de disseny d'Instructure com a CSS tipificat `@property`.

[toCss](functions/toCss.md) converteix qualsevol IR de token en CSS; [css](variables/css.md) és la fulla d'estil `rebrand` ja preparada i [leanCss](variables/leanCss.md) és una variant lleugera que abandona el conjunt complet de `--instui-icon-*` (els ~1.777 data-URIs d'icona que dominen la fulla) per a la lliurament de CDN/embed — aproximadament la sisena part de la mida per cable. Tots dos porten la base d'elevació + contorn de focus (propietats personalitzades compostes els quals constructors purs viuen a `@pantoken/utils`), de manera que una fulla de component resol les seves ombres i anell de focus contra la fulla de token sola. Una entrada d'efecte secundari DOM viu a `@pantoken/css/inject`; fitxers estàtics a `@pantoken/css/style.css` i `@pantoken/css/style.lean.css`.

## Interfaces

- [CssSection](interfaces/CssSection.md)
- [ToCssOptions](interfaces/ToCssOptions.md)

## Variables

- [css](variables/css.md)
- [leanCss](variables/leanCss.md)

## Functions

- [buildCssFile](functions/buildCssFile.md)
- [toCss](functions/toCss.md)

## References

### default

Reanomena i re-exporta [css](variables/css.md)
