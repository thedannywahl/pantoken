[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / RehypeOptions

# واجهة: RehypeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

خيارات لـ [rehypePantokenIcons](../functions/rehypePantokenIcons.md).

## الخصائص

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

مُحلل محدد صراحةً، يُجرب قبل مجموعة أيقونات pantoken المدمجة.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

الإضافات التي تُساهم خطافات `rehype` فيها بالمحللات (تُجرب أولاً).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

اسم الصنف المطبق على الغلاف الناتج (الافتراضي: `pantoken-icon`).
