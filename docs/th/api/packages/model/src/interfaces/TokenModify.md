[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenModify

# อินเทอร์เฟซ: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

A Tokens Studio colour modifier (`$extensions."studio.tokens".modify`).

## คุณสมบัติ

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The modification applied to the resolved colour.

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The modifier amount, `0`–`1`.

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The colour space the modifier operates in (e.g. `"hsl"`).

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The second colour, for `mix`.
