[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / FlattenPropertyOptions

# Comhéadan: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## Airíonna

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### Luach Réamhshocraithe

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### Luach Réamhshocraithe

`"remove"`
