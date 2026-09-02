[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / FlattenPropertyOptions

# Rhyngwyneb: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## Eiddo

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### Gwerth Rhagosodedig

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### Gwerth Rhagosodedig

`"remove"`
