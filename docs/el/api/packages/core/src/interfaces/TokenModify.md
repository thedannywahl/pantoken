[pantoken](../../../../index.md) / [packages/core/src](../index.md) / TokenModify

# Διεπαφή: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

A Tokens Studio colour modifier (`$extensions."studio.tokens".modify`).

## Ιδιότητες

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The modification applied to the resolved colour.

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The modifier amount, `0`–`1`.

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The colour space the modifier operates in (e.g. `"hsl"`).

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The second colour, for `mix`.
