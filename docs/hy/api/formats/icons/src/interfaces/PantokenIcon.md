[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / PantokenIcon

# Ինտերֆեյս: PantokenIcon

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Pantoken պատկերակ, որը ստացվել է `&lt;image&gt;` տոկենից:

## Առանձնահատկություններ

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Պատկերակի անվանումը, առանց `--instui-icon-` նախածանցի (օր. `arrow-left`):

***

### dataUri

> **dataUri**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`url('data:image/svg+xml;utf8,…')` արժեքը, ինչպես պահվում է IR-ում:

***

### svg

> **svg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Վերծանված inline SVG մակբառ, որից հեռացվել են `&lt;script&gt;` տարրերը և իրադարձության-մշակիչի հատկանիշները:
Ծագում վաճառածի IR-ից (ամրակցված վերևում): Անվտանգ ստուգված ներարկման համատեքստերի համար;
սպառողները չպետք է այն վերաբերվեն անվտանգ հարձակվածի կողմից վերահսկվող HTML-ի մեջ ներարկվելու համար:

***

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

SVG `viewBox`, երբ հայտնի:

***

### bidirectional

> **bidirectional**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Թե արդյոք պատկերակը հորիզոնական շրջվում է աջից ձախ համատեքստերում:

***

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Գլիֆի ծագումը:
