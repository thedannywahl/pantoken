[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progressCircle

# متغير: progressCircle

> `const` **progressCircle**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-progress-circle&gt;` — مؤشر دائري مدعوم بمفاهيم `&lt;progress&gt;` الأصلية أو `&lt;meter&gt;`.

`value-now`/`value` تتحكّم في `--value`، بينما `min` و `value-max`/`max` تتحكّم في النطاق. قيمة الحد الأدنى صفر تعرض `&lt;progress&gt;` أصلي؛ قيمة الحد الأدنى غير الصفرية تعرض `&lt;meter&gt;`. أضف سمة البوليان
`should-animate` لتشغيل التحريك من الصفر عند التركيب؛ `animation-delay` هو تأخير بوحدة المِلي ثانية.
`label` يتجاوز الاسم القابل للوصول (الذي بخلاف ذلك يكون افتراضياً النسبة المئوية).

## مثال

```html
<instui-progress-circle value-now="40" value-max="60" should-animate></instui-progress-circle>
```
