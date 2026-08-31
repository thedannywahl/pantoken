[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineRules

# Function: focusOutlineRules()

> **focusOutlineRules**(`selector?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Focus-ring կանոնները տված focusable ընտրիչի համար՝ թափանցիկ հանգստական ring, որ անցում է անում `:focus-visible` վրա, գումարած `-focus-color-*` / `-focus-position-inset` / `-focus-within` / `-without-focus-animation` փոփոխիչներ։ Բոլորը `:where()`-փաթաթված, ուստի զրո-հատկայնություն։

## Parameters

### selector?

`string`

Focusable ընտրիչը, որի վրա բազային ring կիրառվում է (լռելյայն [FOCUSABLE\_SELECTOR](../variables/FOCUSABLE_SELECTOR.md))։

## Returns

`string`

CSS կանոնների տողը։
