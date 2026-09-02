[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / sanitizeSvg

# Funktion: sanitizeSvg()

> **sanitizeSvg**(`svg`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Fjern `&lt;script&gt;` elementer og event-handler-attributter fra SVG-markup.

Defense-in-depth for SVG dekodet fra vendored data URI'er eller bidraget af plugins.
Ikke en fuld HTML-parser — baseres på at upstream-kilden er betroet og fastsat.

## Parametre

### svg

`string`

## Returnerer

`string`
