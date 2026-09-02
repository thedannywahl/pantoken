[pantoken](../../../index.md) / jekyll

# jekyll

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

`@pantoken/jekyll` — emit the Instructure token stylesheet for a Jekyll site.

Jekyll has no standard theming-variable contract, so this delivers the tokens as drop-in assets:
a Sass partial for `_sass/` (import it from your main stylesheet) and a plain CSS file for
`assets/css/` (from `@pantoken/scss` and `@pantoken/css`), plus an InstUI-look prose stylesheet
(from `@pantoken/components`) that styles content in a `.pantoken-prose` region.

## Интерфейсы

- [JekyllFile](interfaces/JekyllFile.md)

## Функции

- [toJekyllAssets](functions/toJekyllAssets.md)
