[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineCss

# دالة: focusOutlineCss()

> **focusOutlineCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء كتلة مخطط التركيز: تعريفات الرموز `--instui-focus-outline-*` بالإضافة إلى قواعد الحلقة.
مضمّنة في `base.css` (حتى تحصل العناصر القابلة للتركيز على الحلقة جاهزة من الصندوق)، وقابلة لإعادة الاستخدام بواسطة المخرجات الطبقية الأخرى
(مثل مكوّن العرض Pendo) عبر خيارات `selector`/`tokenSelector`.

```demo
self:focus-outline
```

## المعلمات

### options?

`selector` — محدد العنصر القابل للتركيز؛ `tokenSelector` — المكان الذي تهبط فيه تعريفات الرموز
  (الافتراضي `:where(:root)`).

#### selector?

`string`

#### tokenSelector?

`string`

## القيم المرجعة

`string`

سلسلة CSS.
