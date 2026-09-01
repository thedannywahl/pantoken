[pantoken](../../../../index.md) / [packages/core/src](../index.md) / CssContribution

# واجهة: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مساهمة CSS يمكن للمكوّن الإضافي إرجاعها من hook الخاص به `css`.

## الخصائص

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

CSS خام مُصدر قبل الأساس المُولد.

***

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

CSS خام مُصدر بعد الأساس المُولد.

***

### properties?

> `optional` **properties?**: `PropertyRule`[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تسجيلات `@property` الموقّعة بالأنواع لإضافتها.

***

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إعلانات `--var: value` ذات النطاق لإضافتها.

***

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مؤشر `data-*` للكتلة المصدرة، لأغراض التصحيح.
