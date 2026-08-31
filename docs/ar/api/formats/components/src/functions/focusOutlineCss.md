[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineCss

# Function: focusOutlineCss()

> **focusOutlineCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء كتلة المخطط التفصيلي للتركيز: تعريفات رموز `--instui-focus-outline-*` بالإضافة إلى قواعد الحلقة.
مدمجة في `base.css` (لذا تحصل focusables على الحلقة بسهولة)، وقابلة لإعادة الاستخدام من قبل المخرجات
الأخرى المرقبة (على سبيل المثال مُصيّر Pendo) عبر خيارات `selector`/`tokenSelector`.

```demo
self:focus-outline
```

## Parameters

### options?

`selector` — محدد focusable؛ `tokenSelector` — حيث تستقر تعريفات الرموز
(الافتراضي `:where(:root)`).

#### selector?

`string`

#### tokenSelector?

`string`

## Returns

`string`

سلسلة CSS.
