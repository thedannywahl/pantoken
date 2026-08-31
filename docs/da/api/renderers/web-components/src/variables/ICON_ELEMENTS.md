[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ICON\_ELEMENTS

# Variable: ICON\_ELEMENTS

> `const` **ICON\_ELEMENTS**: readonly \[`"icon"`, `"calendar"`, `"date-input"`, `"drilldown"`, `"rating"`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Grundlæggende elementnavne, der faktisk kalder [iconSvg](../functions/iconSvg.md) for at gengive en inline-glyphe, i modsætning til
de separate, kun-CSS `-icon-&lt;name&gt;` glyphe-tegning, som de fleste komponenter bruger (en maske på en CSS-tilpasset
egenskab, ingen JS-opløsning involveret). `date-time-input` er ikke anført, fordi det ikke kalder
`iconSvg` selv — det indlejrer `date-input`/`calendar` (se [NESTED\_DEPS](NESTED_DEPS.md)), som gør.
