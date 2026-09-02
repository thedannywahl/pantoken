[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ICON\_ELEMENTS

# Variable: ICON\_ELEMENTS

> `const` **ICON\_ELEMENTS**: readonly \[`"icon"`, `"calendar"`, `"date-input"`, `"drilldown"`, `"rating"`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Els noms d'elements base que realment criden a [iconSvg](../functions/iconSvg.md) per renderitzar un glyf en línia, a diferència del dibuix de glyf `-icon-&lt;name&gt;` només de CSS separat que utilitzen la majoria de components (una màscara en una propietat personalitzada de CSS, sense resolució de JS). `date-time-input` no es llista perquè no crida `iconSvg` per si mateix — imbrica `date-input`/`calendar` (consulteu [NESTED\_DEPS](NESTED_DEPS.md)), que ho fan.
