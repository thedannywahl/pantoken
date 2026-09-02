[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progress

# متغير: progress

> `const` **progress**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-progress&gt;` — مؤشر أفقي مدعوم بدلالات `&lt;progress&gt;` أو `&lt;meter&gt;` الأصلية.

`value-now`/`value` تُحرِّك `--value`، بينما `min` و `value-max`/`max` تُحرِّكان النطاق. حد أدنى بقيمة صفر
يُنتِج `&lt;progress&gt;` أصليًا؛ والحد الأدنى غير الصفري يُنتِج `&lt;meter&gt;`. أضف السمة البوليانية
`should-animate` لانتقال تغييرات المقياس خلال نصف ثانية. `variant` تُطابق الـ
مكوّن مع `-color-&lt;variant&gt;` و `label` يوفّر اسمه القابل للوصول.

## مثال

```html
<instui-progress value-now="40" value-max="60" variant="success" should-animate></instui-progress>
```
