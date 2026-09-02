[pantoken](../../../../index.md) / [packages/core/src](../index.md) / TokenModify

# 인터페이스: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

A Tokens Studio colour modifier (`$extensions."studio.tokens".modify`).

## 속성

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The modification applied to the resolved colour.

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The modifier amount, `0`–`1`.

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The colour space the modifier operates in (e.g. `"hsl"`).

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The second colour, for `mix`.
