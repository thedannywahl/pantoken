[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineRules

# Funktion: focusOutlineRules()

> **focusOutlineRules**(`selector?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The focus-ring rules for a given focusable selector: a transparent resting ring that transitions in
on `:focus-visible`, plus the `-focus-color-*` / `-focus-position-inset` / `-focus-within` /
`-without-focus-animation` modifiers. All `:where()`-wrapped, so zero-specificity.

## Parameter

### selector?

`string`

The focusable selector the base ring applies to (default [FOCUSABLE\_SELECTOR](../variables/FOCUSABLE_SELECTOR.md)).

## Rückgabe

`string`

The CSS rules string.
