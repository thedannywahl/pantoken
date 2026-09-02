[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenModify

# Интерфейс: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

A Tokens Studio colour modifier (`$extensions."studio.tokens".modify`).

## Свойства

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The modification applied to the resolved colour.

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The modifier amount, `0`–`1`.

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The colour space the modifier operates in (e.g. `"hsl"`).

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The second colour, for `mix`.
