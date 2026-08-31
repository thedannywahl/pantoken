[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / MarkdownItOptions

# Interface: MarkdownItOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

خيارات ل [pantokenMarkdownIt](../functions/pantokenMarkdownIt.md).

## Properties

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

معالج أيقونة صريح، يتم محاولته بعد معالجات المكون الإضافي وقبل المجموعة المدمجة.

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

المكونات الإضافية التي تساهم خطاطيف `rehype` الخاصة بها في معالجات الأيقونة (تم محاولتها أولاً).

---

### iconClassName?

> `optional` **iconClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

الفئة المطبقة على غلاف الأيقونة (الافتراضي: `pantoken-icon`).

---

### swatchClassName?

> `optional` **swatchClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

الفئة المطبقة على غلاف عينة الألوان (الافتراضي: `pantoken-color-swatch`).

---

### icons?

> `optional` **icons?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

رسم رموز `:icon:` كـ SVG مضمنة (الافتراضي: `true`).

---

### swatches?

> `optional` **swatches?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

رسم قيم الألوان المستقلة كعينات (الافتراضي: `true`).
