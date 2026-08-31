[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / focusOutlineRules

# Function: focusOutlineRules()

> **focusOutlineRules**(`selector?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Focus-ring-reglerne for en given fokuserbar selector: en transparent hvilende ring, der overgår
på `:focus-visible`, plus `-focus-color-*` / `-focus-position-inset` / `-focus-within` /
`-without-focus-animation` modifikatorer. Alle `:where()`-omsluttet, så nul-specificitet.

## Parameters

### selector?

`string` = `FOCUSABLE_SELECTOR`

Den fokuserbar selector som base-ringen gælder for (standard [FOCUSABLE\_SELECTOR](../variables/FOCUSABLE_SELECTOR.md)).

## Returns

`string`

CSS-regelstrengen.
