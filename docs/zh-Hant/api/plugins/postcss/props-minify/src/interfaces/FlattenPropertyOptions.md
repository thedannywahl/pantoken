[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / FlattenPropertyOptions

# 介面: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## 屬性

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### 預設值

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### 預設值

`"remove"`
