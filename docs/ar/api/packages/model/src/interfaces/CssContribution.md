[pantoken](../../../../index.md) / [packages/model/src](../index.md) / CssContribution

# واجهة: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مساهمة CSS يمكن أن تُعيدها الإضافة من هوك `css`.

## الخصائص

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

CSS خام يتم إخراجه قبل الأساس المولَّد.

***

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

CSS خام يتم إخراجه بعد الأساس المولَّد.

***

### properties?

> `optional` **properties?**: [`PropertyRule`](PropertyRule.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تسجيلات `@property` الممَيَّزة بالأنواع لإضافتها.

***

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إعلانات `--var: value` المقيَّدة بالنطاق لإضافتها.

***

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

علامة `data-*` للكتلة المُصدرة، لأغراض التصحيح.
