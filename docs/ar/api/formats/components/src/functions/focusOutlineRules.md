[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineRules

# دالة: focusOutlineRules()

> **focusOutlineRules**(`selector?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

قواعد حلقة التركيز للمحدد القابل للتركيز المعطى: حلقة شفافة في حالة الراحة تنتقل إلى الداخل
عند `:focus-visible`، بالإضافة إلى المعدِّلات `-focus-color-*` / `-focus-position-inset` / `-focus-within` /
`-without-focus-animation`. كلها مغلفة بـ`:where()`، لذا بدرجة خصوصية صفر.

## المعلمات

### selector?

`string`

المحدد القابل للتركيز الذي تنطبق عليه الحلقة الأساسية (الافتراضي [FOCUSABLE\_SELECTOR](../variables/FOCUSABLE_SELECTOR.md)).

## القيم المرجعة

`string`

سلسلة قواعد CSS.
