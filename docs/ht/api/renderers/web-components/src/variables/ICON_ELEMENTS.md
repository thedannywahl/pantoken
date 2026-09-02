[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ICON\_ELEMENTS

# Varyab: ICON\_ELEMENTS

> `const` **ICON\_ELEMENTS**: readonly \[`"icon"`, `"calendar"`, `"date-input"`, `"drilldown"`, `"rating"`\]

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Base element names that actually call [iconSvg](../functions/iconSvg.md) to render an inline glyph, as opposed to the
separate, CSS-only `-icon-&lt;name&gt;` glyph painting most components use (a mask on a CSS custom
property, no JS resolution involved). `date-time-input` isn't listed because it doesn't call
`iconSvg` itself — it nests `date-input`/`calendar` (see [NESTED\_DEPS](NESTED_DEPS.md)), which do.
