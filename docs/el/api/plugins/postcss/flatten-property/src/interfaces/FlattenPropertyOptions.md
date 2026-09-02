[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / FlattenPropertyOptions

# Διεπαφή: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## Ιδιότητες

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### Προεπιλεγμένη τιμή

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### Προεπιλεγμένη τιμή

`"remove"`
