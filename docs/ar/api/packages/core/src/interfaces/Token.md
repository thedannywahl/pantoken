[pantoken](../../../../index.md) / [packages/core/src](../index.md) / Token

# واجهة: Token

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

رمز تصميم واحد في تمثيل IR القياسي المتوافق مع `@property`.

## الخصائص

### name

> **name**: `string`

اسم الخاصية المخصصة، على سبيل المثال `--instui-color-background-base`.

***

### syntax

> **syntax**: `string`

وَاصِف `syntax` الخاص بـ `@property` (`"&lt;color&gt;"`, `"&lt;length&gt;"`, `"&lt;image&gt;"`, …) أو `"*"` للقيم السياقية.

***

### inherits

> **inherits**: `boolean`

علامة `inherits` الخاصة بـ `@property`.

***

### value

> **value**: `string`

قيمة ملموسة، إشارة `var(...)`، أو زوج `light-dark(a, b)`.

***

### themed?

> `optional` **themed?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

صحيح عندما تختلف النسختان الفاتحة والداكنة (القيمة هي `light-dark()`).

***

### refersTo?

> `optional` **refersTo?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الرمز الذي يشير إليه هذا العنصر، عندما يكون `value` عبارة عن `var(...)` واحد.

***

### meta?

> `optional` **meta?**: [`TokenMeta`](TokenMeta.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بيانات وصفية غير متعلقة بالقيمة.
