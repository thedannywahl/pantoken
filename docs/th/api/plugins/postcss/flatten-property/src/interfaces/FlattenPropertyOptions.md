[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / FlattenPropertyOptions

# อินเทอร์เฟซ: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## คุณสมบัติ

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### ค่าตั้งต้น

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### ค่าตั้งต้น

`"remove"`
