[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / FlattenPropertyOptions

# Interfáhta: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## Properties

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### Default-waarda

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### Default-waarda

`"remove"`
