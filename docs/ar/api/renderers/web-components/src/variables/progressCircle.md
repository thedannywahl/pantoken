[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progressCircle

# Variable: progressCircle

> `const` **progressCircle**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-progress-circle&gt;` — مؤشر دائري مدعوم من `&lt;progress&gt;` الأصلي أو دلالات `&lt;meter&gt;`.

`value-now`/`value` تقود `--value`، بينما `min` و `value-max`/`max` تقود النطاق. الحد الأدنى صفر يعرض `&lt;progress&gt;` أصلي؛ الحد الأدنى غير الصفري يعرض `&lt;meter&gt;`. أضف السمة المنطقية `should-animate` للرسوم المتحركة من الصفر عند التثبيت؛ `animation-delay` تأخير بالميلي ثانية.
`label` يتجاوز الاسم القابل للوصول (الذي يأتي بخلاف ذلك افتراضياً إلى النسبة المئوية).

## Example

```html
<instui-progress-circle value-now="40" value-max="60" should-animate></instui-progress-circle>
```
