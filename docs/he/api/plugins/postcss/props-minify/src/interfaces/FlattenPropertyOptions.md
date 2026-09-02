[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / FlattenPropertyOptions

# ממשק: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Options for [flattenProperty](../variables/flattenProperty.md).

## תכונות

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

The selector of the rule that receives the extracted `--name: value` declarations.

#### ערך ברירת מחדל

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

What to do with an `@property` at-rule that has no `initial-value` descriptor.

- `"remove"` — drop the at-rule (default).
- `"keep"` — leave it in the output untouched.

#### ערך ברירת מחדל

`"remove"`
