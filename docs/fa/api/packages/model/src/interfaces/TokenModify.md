[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenModify

# رابط: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

A Tokens Studio colour modifier (`$extensions."studio.tokens".modify`).

## خصوصیات

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The modification applied to the resolved colour.

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The modifier amount, `0`–`1`.

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The colour space the modifier operates in (e.g. `"hsl"`).

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The second colour, for `mix`.
