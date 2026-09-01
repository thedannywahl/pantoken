[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnFile

# واجهة: CdnFile

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

ملف واحد للتحميل من CDN، محدد باسم حزمة npm والمسار داخلها.

## الخصائص

### package

> **package**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

اسم حزمة npm، على سبيل المثال `"@pantoken/components"`.

***

### path?

> `optional` **path?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

المسار داخل الحزمة، على سبيل المثال `"dist/components.css"`. اتركه فارغًا للإشارة إلى جذر الحزمة.

***

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

يتجاوز إصدار الموفر/المستوى البنائي لهذا الملف فقط.

***

### raw?

> `optional` **raw?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

بالنسبة للموفرين الذين يحوّلون JS افتراضيًا (esm.sh): `false` يسمح للموفر بتطبيق تحويل ESM الاعتيادي (مطلوب لـ `import` نقطة دخول حقيقية للحزمة).
الإفتراضي هو `true` — تقديم الملف كما هو حرفيًا، مطلوب للأصول المبنية مسبقًا/غير ESM مثل ملفات CSS وحزم IIFE.
