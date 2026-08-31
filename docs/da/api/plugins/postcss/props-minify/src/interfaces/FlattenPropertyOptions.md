[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / FlattenPropertyOptions

# Interface: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Indstillinger for [flattenProperty](../variables/flattenProperty.md).

## Properties

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Selectoren for reglen, der modtager de ekstraherede `--name: value` erklæringer.

#### Default Value

`":root"`

---

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Hvad du skal gøre med en `@property` at-rule, der ikke har nogen `initial-value` deskriptor.

- `"remove"` — drop at-rule'en (standard).
- `"keep"` — lad det være i outputtet uændret.

#### Default Value

`"remove"`
