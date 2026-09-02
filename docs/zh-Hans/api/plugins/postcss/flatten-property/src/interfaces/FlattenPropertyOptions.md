[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / FlattenPropertyOptions

# 接口: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## 属性

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### 默认值

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### 默认值

`"remove"`
