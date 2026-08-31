[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenModify

# Interface: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

En Tokens Studio farvemodifikator (`$extensions."studio.tokens".modify`).

## Properties

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ændringen anvendt på den løste farve.

---

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Modifikatorbeløbet, `0`–`1`.

---

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Det farverum, som modifikatoren opererer i (f.eks. `"hsl"`).

---

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Den anden farve til `mix`.
