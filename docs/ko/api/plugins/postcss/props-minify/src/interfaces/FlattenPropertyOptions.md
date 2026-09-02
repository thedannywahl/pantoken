[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / FlattenPropertyOptions

# 인터페이스: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## 속성

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### 기본값

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### 기본값

`"remove"`
