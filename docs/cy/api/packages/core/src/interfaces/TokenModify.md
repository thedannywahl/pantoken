[pantoken](../../../../index.md) / [packages/core/src](../index.md) / TokenModify

# Rhyngwyneb: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

A Tokens Studio colour modifier (`$extensions."studio.tokens".modify`).

## Eiddo

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The modification applied to the resolved colour.

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The modifier amount, `0`–`1`.

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The colour space the modifier operates in (e.g. `"hsl"`).

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The second colour, for `mix`.
