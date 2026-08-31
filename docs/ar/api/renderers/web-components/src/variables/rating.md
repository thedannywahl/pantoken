[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / rating

# Variable: rating

> `const` **rating**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-rating&gt;` — تقييم نجمي مع `role="img"`. `value` هو عدد النجوم المملوءة، `max`
الإجمالي (الافتراضي 5)، و `label` يتجاوز الاسم القابل للوصول (يأتي افتراضياً إلى `value/max`). تتم معالجة النجوم كرموز SVG مضمنة (صلبة = مملوءة)، بحجم النص.

## Example

```html
<instui-rating value="4" max="5" label="4 out of 5 stars"></instui-rating>
```
