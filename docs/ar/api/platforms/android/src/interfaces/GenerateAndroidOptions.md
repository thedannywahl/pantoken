[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / GenerateAndroidOptions

# واجهة: GenerateAndroidOptions

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

خيارات لـ [generateAndroid](../functions/generateAndroid.md) / [toAndroid](../functions/toAndroid.md).

## الخصائص

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

دليل الإخراج؛ تُكتب الملفات تحت `&lt;outDir&gt;/res/values`.

***

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

السمة التي سيتم إصدارها (الافتراضي: `"rebrand"`).

***

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أي وضع `light-dark()` لحله (الافتراضي: `"light"`).

***

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أسماء الرموز لإصدارها أيضًا كـ VectorDrawables تحت `res/drawable` (الافتراضي: لا شيء).
