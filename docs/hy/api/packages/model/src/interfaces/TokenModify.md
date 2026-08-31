[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenModify

# Interface: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tokens Studio գույն փոփոխիչ (`$extensions."studio.tokens".modify`):

## Properties

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Լուծված գույնի համար կիրառված փոփոխությունը:

---

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Փոփոխչի գումարը, `0`–`1`:

---

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Գույնային տարածքը, որում փոփոխիչը գործում է (օր. `"hsl"`):

---

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Երկրորդ գույնը `mix`-ի համար:
