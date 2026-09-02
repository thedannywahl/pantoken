[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / FlattenPropertyOptions

# インターフェース: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## プロパティ

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### 既定値

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### 既定値

`"remove"`
