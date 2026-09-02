[pantoken](../../../index.md) / jekyll

# jekyll

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/jekyll` — udled Instructure token-stylesheet til et Jekyll-websted.

Jekyll har ingen standard tema-variabel kontrakt, så dette leverer tokens som drop-in aktiver: en Sass-partial til `_sass/` (importer det fra dit hovedstylesheet) og en almindelig CSS-fil til `assets/css/` (fra `@pantoken/scss` og `@pantoken/css`), plus en InstUI-lignende prosa-stylesheet (fra `@pantoken/components`) der styler indhold i en `.pantoken-prose` region.

## Interfaces

- [JekyllFile](interfaces/JekyllFile.md)

## Funktioner

- [toJekyllAssets](functions/toJekyllAssets.md)
