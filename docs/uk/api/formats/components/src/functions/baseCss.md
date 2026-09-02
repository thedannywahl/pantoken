[pantoken](../../../../index.md) / [formats/components/src](../index.md) / baseCss

# Функція: baseCss()

> **baseCss**(): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Build the opt-in base/reset stylesheet: global document defaults from the tokens (box-sizing, body
reset, page surface, base text colour/font, `color-scheme`, base link), followed by the focus-ring
rules (a document-level default that targets bare focusables). Only the ring *rules* live here — the
`--instui-focus-outline-*` custom properties they read ship in the token sheet (`@pantoken/css`), so
`base.css` no longer redefines them. Load it once, ahead of the component and prose sheets, when
pantoken owns the page.

## Повертає

`string`

The CSS string.
