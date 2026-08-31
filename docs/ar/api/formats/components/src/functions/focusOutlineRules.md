[pantoken](../../../../index.md) / [formats/components/src](../index.md) / focusOutlineRules

# Function: focusOutlineRules()

> **focusOutlineRules**(`selector?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

قواعد حلقة التركيز لمحدد focusable معين: حلقة راحة شفافة تتحول إلى
على `:focus-visible`، بالإضافة إلى معدلات `-focus-color-*` / `-focus-position-inset` / `-focus-within` /
`-without-focus-animation`. الكل `:where()`-ملفوف، لذا صفر-التحديد.

## Parameters

### selector?

`string`

محدد focusable الذي تنطبق عليه الحلقة الأساسية (الافتراضي [FOCUSABLE\_SELECTOR](../variables/FOCUSABLE_SELECTOR.md)).

## Returns

`string`

سلسلة قواعد CSS.
