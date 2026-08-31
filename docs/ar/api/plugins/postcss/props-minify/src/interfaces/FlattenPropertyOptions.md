[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / FlattenPropertyOptions

# Interface: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

خيارات [flattenProperty](../variables/flattenProperty.md).

## Properties

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

محدد القاعدة التي تتلقى إعلانات `--name: value` المستخرجة.

#### Default Value

`":root"`

---

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

ماذا تفعل مع قاعدة `@property` التي ليس لديها وصفة `initial-value`.

- `"remove"` — إسقاط القاعدة (الإعداد الافتراضي).
- `"keep"` — تركها في الإخراج دون تغيير.

#### Default Value

`"remove"`
