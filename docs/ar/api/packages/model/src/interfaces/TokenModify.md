[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenModify

# Interface: TokenModify

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

معدِّل لون Tokens Studio (`$extensions."studio.tokens".modify`).

## Properties

### type

> **type**: `"darken"` \| `"lighten"` \| `"alpha"` \| `"mix"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

التعديل المطبق على اللون المحلول.

---

### value

> **value**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مبلغ المعدِّل، `0`–`1`.

---

### space?

> `optional` **space?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مساحة اللون التي يعمل فيها المعدل (على سبيل المثال `"hsl"`).

---

### color?

> `optional` **color?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اللون الثاني، لـ `mix`.
