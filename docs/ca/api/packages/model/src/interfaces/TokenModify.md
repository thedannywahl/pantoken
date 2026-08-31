[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenModify

# Interface: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un modificador de color de Tokens Studio (`$extensions."studio.tokens".modify`).

## Properties

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

La modificació aplicada al color resolt.

---

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

La quantitat de modificador, `0`–`1`.

---

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

L'espai de color en el qual funciona el modifier (p. ex. `"hsl"`).

---

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El segon color, per a `mix`.
