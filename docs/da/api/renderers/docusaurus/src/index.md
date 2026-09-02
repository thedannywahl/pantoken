[pantoken](../../../index.md) / docusaurus

# docusaurus

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/docusaurus` — tema et Docusaurus-site med Instructure tokens.

Docusaurus-stilarter kommer fra Infima, hvis tema styres af `--ifm-*` CSS-variabler. Det peger disse mod `var(--instui-*)`, så hvis du slipper output ind i `src/css/custom.css` (sammen med `@pantoken/css`, som definerer de brugerdefinerede egenskaber) skins dokumenterne igen med Instructure-udseendet mens lys/mørk fortsætter med at flyde gennem de samme tokens.

## Interfaces

- [ToDocusaurusCssOptions](interfaces/ToDocusaurusCssOptions.md)

## Variabler

- [INFIMA\_TO\_INSTUI](variables/INFIMA_TO_INSTUI.md)
- [docusaurusCss](variables/docusaurusCss.md)

## Funktioner

- [toDocusaurusCss](functions/toDocusaurusCss.md)

## Referencer

### default

Omdøber og re-eksporterer [docusaurusCss](variables/docusaurusCss.md)
