[pantoken](../../../../../index.md) / [plugins/pantoken/colors/src](../index.md) / overlayColors

# Funktion: overlayColors()

> **overlayColors**(`base`, `overlay`, `percent?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Fladjern `overlay` (med `percent`% styrke) over en uigennemsigtig `base` — en CSS-kun erstatning for
ui-color-utils `overlayColors`. Denne hjælper source-over-composites to RGBA-farver til ét uigennemsigtigt
resultat; det almindelige tilfælde (en halvgennemsigtig farvetone over en solid overflade) er præcis en to-farve
`color-mix()`. Generel RGBA-over-RGBA-compositing kan ikke være en enkelt CSS-farve, så dette dækker kun
det ugennemsigtige-base-tilfælde.

## Parametre

### base

`string`

Den ugennemsigtige baggrundsfarve.

### overlay

`string`

Farven lagt over den.

### percent?

`number` = `50`

Hvor meget af `overlay` vises gennem, 0–100 (standard `50`).

## Returnerer

`string`

Et `color-mix()` udtryk.

## Eksempel

```ts
overlayColors("var(--surface)", "var(--brand)", 12);
// "color-mix(in srgb, var(--brand) 12%, var(--surface))"
```
