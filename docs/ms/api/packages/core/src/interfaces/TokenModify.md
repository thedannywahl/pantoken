[pantoken](../../../../index.md) / [packages/core/src](../index.md) / TokenModify

# Antaramuka: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A Tokens Studio colour modifier (`$extensions."studio.tokens".modify`).

## Sifat

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The modification applied to the resolved colour.

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The modifier amount, `0`–`1`.

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The colour space the modifier operates in (e.g. `"hsl"`).

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The second colour, for `mix`.
