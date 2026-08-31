[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / progress

# Variable: progress

> `const` **progress**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-progress&gt;` — مؤشر أفقي مدعوم من `&lt;progress&gt;` الأصلي أو دلالات `&lt;meter&gt;`.

`value-now`/`value` تقود `--value`، بينما `min` و `value-max`/`max` تقود النطاق. الحد الأدنى صفر يعرض `&lt;progress&gt;` أصلي؛ الحد الأدنى غير الصفري يعرض `&lt;meter&gt;`. أضف السمة المنطقية `should-animate` لتحويل تغييرات العداد على مدى نصف ثانية. يعيّن `variant` المكون إلى `-color-&lt;variant&gt;` و يوفر `label` اسمه القابل للوصول.

## Example

```html
<instui-progress value-now="40" value-max="60" variant="success" should-animate></instui-progress>
```
