[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / GenerateAndroidOptions

# Interface: GenerateAndroidOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

خيارات [generateAndroid](../functions/generateAndroid.md) / [toAndroid](../functions/toAndroid.md).

## Properties

### outDir

> **outDir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

دليل الإخراج؛ تتم كتابة الملفات ضمن `&lt;outDir&gt;/res/values`.

---

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

الموضوع المراد إصداره (الافتراضي: `"rebrand"`).

---

### mode?

> `optional` **mode?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

أي وضع `light-dark()` تحتاج إلى حل (الافتراضي: `"light"`).

---

### icons?

> `optional` **icons?**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

أسماء الأيقونات التي سيتم إصدارها أيضًا كـ VectorDrawables ضمن `res/drawable` (الافتراضي: بلا).
