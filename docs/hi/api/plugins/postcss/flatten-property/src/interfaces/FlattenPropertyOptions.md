[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / FlattenPropertyOptions

# इंटरफेस: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## प्रॉपर्टीज

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### डिफ़ॉल्ट मान

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### डिफ़ॉल्ट मान

`"remove"`
