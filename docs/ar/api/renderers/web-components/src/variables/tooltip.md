[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tooltip

# متغير: tooltip

> `const` **tooltip**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-tooltip&gt;` — يغلف مشغلًا موضوعةً في فتحة ويعرض فقاعة `.tip` (مأخوذة من الخاصية `tip`)
عند المرور بالمؤشر/التركيز. تُطابق `placement` مع `-placement-&lt;value&gt;` (مثلاً `bottom`, `end`); تقوم `show-delay` و
`hide-delay` (ms، القيمة الافتراضية 0) بتحكم تأخير الإظهار/الإخفاء، ويقوم مفتاح Escape بإخفائها. تتحكم JS في توقيت الحدث:
تجاوز `.-show`-المسيّر لـ `!important` يلغي عمل الإظهار التلقائي المعتمد على CSS الخالص `:hover`/`:focus-within`
بحيث ينطبق التأخير فعليًا.

## مثال

```html
<instui-tooltip tip="Placement bottom" placement="bottom" show-delay="200">
  <button class="instui-button -color-secondary">Hover me</button>
</instui-tooltip>
```
