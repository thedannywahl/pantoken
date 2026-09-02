[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / FlattenPropertyOptions

# Інтерфейс: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## Властивості

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### Значення за замовчуванням

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### Значення за замовчуванням

`"remove"`
