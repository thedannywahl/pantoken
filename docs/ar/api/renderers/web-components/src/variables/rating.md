[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / rating

# متغير: rating

> `const` **rating**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-rating&gt;` — تقييم بالنجوم مع `role="img"`. `value` هو عدد النجوم المملوءة، `max`
الإجمالي (الافتراضي 5)، و `label` يتجاوز الاسم القابل للوصول (الافتراضي `value/max`). النجوم
تُعرض كرموز SVG مضمّنة (solid = مملوءة)، بحجم يتناسب مع النص.

## مثال

```html
<instui-rating value="4" max="5" label="4 out of 5 stars"></instui-rating>
```
