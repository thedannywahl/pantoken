[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenModify

# Ինտերֆեյս: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Tokens Studio գույն փոփոխիչ (`$extensions."studio.tokens".modify`):

## Առանձնահատկություններ

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Լուծված գույնի համար կիրառված փոփոխությունը:

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Փոփոխչի գումարը, `0`–`1`:

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Գույնային տարածքը, որում փոփոխիչը գործում է (օր. `"hsl"`):

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Երկրորդ գույնը `mix`-ի համար:
