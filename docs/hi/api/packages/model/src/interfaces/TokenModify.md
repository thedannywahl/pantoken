[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenModify

# इंटरफेस: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

A Tokens Studio colour modifier (`$extensions."studio.tokens".modify`).

## प्रॉपर्टीज

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The modification applied to the resolved colour.

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The modifier amount, `0`–`1`.

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The colour space the modifier operates in (e.g. `"hsl"`).

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The second colour, for `mix`.
