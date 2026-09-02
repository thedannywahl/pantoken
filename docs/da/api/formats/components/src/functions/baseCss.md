[pantoken](../../../../index.md) / [formats/components/src](../index.md) / baseCss

# Funktion: baseCss()

> **baseCss**(): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg opt-in base/reset stylesheet: globale dokumentstandards fra tokens (box-sizing, body
reset, pagesurface, base tekstfarve/skrift, `color-scheme`, base link), efterfulgt af focus-ring
regler (en dokumentniveaustandard, der målretter bare focusables). Kun ring *reglerne* ligger her — de
`--instui-focus-outline-*` brugerdefinerede egenskaber de læser sendes i token-arket (`@pantoken/css`), så
`base.css` umdefinerer dem ikke længere. Indlæs det en gang, før komponent- og prosa-arkene, når
pantoken ejer siden.

## Returnerer

`string`

CSS-strengen.
