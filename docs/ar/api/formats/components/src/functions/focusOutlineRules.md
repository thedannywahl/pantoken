[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineRules

# دالة: focusOutlineRules()

> **focusOutlineRules**(`selector?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

قواعد حلقة التركيز للمُحدِّد القابل للتركيز: حلقة راحة شفافة تنتقل للدخول
عند `:focus-visible`، بالإضافة إلى مُعدِّلات `-focus-color-*` / `-focus-position-inset` / `-focus-within` /
`-without-focus-animation`. كل ذلك مغلف بـ `:where()`، لذا ذات خصوصية صفرية.

## المعلمات

### selector?

`string`

المُحدِّد القابل للتركيز الذي تنطبق عليه الحلقة الأساسية (الافتراضي [FOCUSABLE\_SELECTOR](../variables/FOCUSABLE_SELECTOR.md)).

## القيم المرجعة

`string`

سلسلة قواعد CSS.
