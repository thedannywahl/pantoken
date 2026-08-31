[pantoken](../../../../index.md) / [packages/core/src](../index.md) / Token

# Interface: Token

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

رمز تصميم واحد في IR المتوافق القانوني `@property`.

## Properties

### name

> **name**: `string`

اسم الخاصية المخصصة، على سبيل المثال `--instui-color-background-base`.

---

### syntax

> **syntax**: `string`

واصف `@property` `syntax` (`"&lt;color&gt;"`, `"&lt;length&gt;"`,
`"&lt;image&gt;"`, …) أو `"*"` للقيم السياقية.

---

### inherits

> **inherits**: `boolean`

علم `@property` `inherits`.

---

### value

> **value**: `string`

قيمة ملموسة، مرجع `var(...)`، أو زوج `light-dark(a, b)`.

---

### themed?

> `optional` **themed?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

صحيح عندما تختلف دقات الضوء والظلام (القيمة هي `light-dark()`).

---

### refersTo?

> `optional` **refersTo?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

الرمز الذي يشير إليه هذا، عندما يكون `value` رمز واحد `var(...)`.

---

### meta?

> `optional` **meta?**: [`TokenMeta`](TokenMeta.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

البيانات الوصفية غير المرتبطة بالقيمة.
