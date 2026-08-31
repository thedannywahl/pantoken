[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineRules

# Function: focusOutlineRules()

> **focusOutlineRules**(`selector?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Les regles de focus-ring per a un selector enfocable donat: un anell de repòs transparent que fa la transició en `:focus-visible`, més els modificadors `-focus-color-*` / `-focus-position-inset` / `-focus-within` /
`-without-focus-animation`. Tot `:where()`-embolcallat, així que especificitat zero.

## Parameters

### selector?

`string`

El selector enfocable al qual s'aplica l'anell base (per defecte [FOCUSABLE\_SELECTOR](../variables/FOCUSABLE_SELECTOR.md)).

## Returns

`string`

La cadena de regles CSS.
