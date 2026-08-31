[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnFile

# Interface: CdnFile

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

ملف واحد للتحميل من CDN، معروّف بواسطة اسم حزمة npm والمسار بداخله.

## Properties

### package

> **package**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

اسم حزمة npm، على سبيل المثال `"@pantoken/components"`.

---

### path?

> `optional` **path?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

المسار داخل الحزمة، على سبيل المثال `"dist/components.css"`. حذفه للإشارة إلى جذر الحزمة.

---

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

يتجاوز إصدار المزود/البناء لهذا الملف فقط.

---

### raw?

> `optional` **raw?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

بالنسبة للمزودين الذين يحولون JS بشكل افتراضي (esm.sh): يسمح `false` للمزود بتطبيق تحويل ESM العادي (مطلوب لـ `import` نقطة دخول حزمة حقيقية). القيمة الافتراضية هي `true` — تقديم الملف كما هو، مطلوب للأصول المعدة مسبقًا/غير ESM مثل أوراق CSS وحزم IIFE.
