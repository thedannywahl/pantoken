[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenModify

# 介面: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

A Tokens Studio colour modifier (`$extensions."studio.tokens".modify`).

## 屬性

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The modification applied to the resolved colour.

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The modifier amount, `0`–`1`.

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The colour space the modifier operates in (e.g. `"hsl"`).

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The second colour, for `mix`.
