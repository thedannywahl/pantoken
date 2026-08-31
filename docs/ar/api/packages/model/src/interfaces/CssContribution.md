[pantoken](../../../../index.md) / [packages/model/src](../index.md) / CssContribution

# Interface: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مساهمة CSS يمكن لمكون إضافي إرجاعها من خطافها `css`.

## Properties

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS خام مُصدّرة قبل القاعدة المُولّدة.

---

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS خام مُصدّرة بعد القاعدة المُولّدة.

---

### properties?

> `optional` **properties?**: [`PropertyRule`](PropertyRule.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تسجيلات `@property` المكتوبة المراد إضافتها.

---

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تعريفات `--var: value` ذات نطاق المراد إضافتها.

---

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

علامة `data-*` للكتلة المُصدّرة، للتصحيح.
