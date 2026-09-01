[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / FlattenPropertyOptions

# واجهة: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات لـ [flattenProperty](../variables/flattenProperty.md).

## الخصائص

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

محدد القاعدة التي تستقبل التصريحات المستخرجة `--name: value`.

#### القيمة الافتراضية

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

ماذا يُفعل مع at-rule من نوع `@property` لا يحتوي على واصف `initial-value`.

- `"remove"` — إسقاط الـ at-rule (الافتراضي).
- `"keep"` — إبقاؤه في الإخراج دون تغيير.

#### القيمة الافتراضية

`"remove"`
