[pantoken](../../../../index.md) / [packages/core/src](../index.md) / TokenModify

# واجهة: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مُعدّل لون في Tokens Studio (`$extensions."studio.tokens".modify`).

## الخصائص

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

التعديل المطبق على اللون المحلل.

***

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مقدار المُعدّل، `0`–`1`.

***

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مساحة اللون التي يعمل فيها المُعدّل (مثال: `"hsl"`).

***

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اللون الثاني، لـ `mix`.
