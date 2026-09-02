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

ماذا يجب فعله مع قاعدة `@property` (at-rule) التي لا تحتوي على واصف `initial-value`.

- `"remove"` — استبعد الـ at-rule (افتراضي).
- `"keep"` — اتركها في الناتج دون تغيير.

#### القيمة الافتراضية

`"remove"`
