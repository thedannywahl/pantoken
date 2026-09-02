[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / MarkdownItOptions

# واجهة: MarkdownItOptions

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

خيارات لـ [pantokenMarkdownIt](../functions/pantokenMarkdownIt.md).

## الخصائص

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

محلل أيقونات صريح، يتم تجربته بعد محولات الإضافات وقبل المجموعة المدمجة.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

الإضافات التي تسهم حلقات `rehype` الخاصة بها في مُحللات الأيقونات (تُجرب أولاً).

***

### iconClassName?

> `optional` **iconClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

الصنف المطبق على غلاف الأيقونة (الافتراضي: `pantoken-icon`).

***

### swatchClassName?

> `optional` **swatchClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

الصنف المطبق على غلاف عيّنة اللون (الافتراضي: `pantoken-color-swatch`).

***

### icons?

> `optional` **icons?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

عرض رموز `:icon:` كـ SVG مضمن (الافتراضي: `true`).

***

### swatches?

> `optional` **swatches?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

عرض قيم الألوان المنفصلة كعيّنات لونية (الافتراضي: `true`).
