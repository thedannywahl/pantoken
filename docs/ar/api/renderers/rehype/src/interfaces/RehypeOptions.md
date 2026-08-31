[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / RehypeOptions

# Interface: RehypeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

خيارات [rehypePantokenIcons](../functions/rehypePantokenIcons.md).

## Properties

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

محل صريح، يتم تجربته قبل مجموعة أيقونات pantoken المدمجة.

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

الإضافات التي توصل hooks `rehype` بها (يتم تجربتها أولاً).

---

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

اسم الفئة المطبق على الغلاف المُصدَّر (الافتراضي: `pantoken-icon`).
