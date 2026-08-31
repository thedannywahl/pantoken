[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / FlattenPropertyOptions

# Interface: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

[flattenProperty](../variables/flattenProperty.md)-ի ընտրանքներ:

## Properties

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կանոնի ընտրիչը, որը ստանում է հանված `--name: value` հայտարարությունները:

#### Default Value

`":root"`

---

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ինչ անել `@property` at-կանոնի հետ, որն անում չունի `initial-value` նկարագիր:

- `"remove"` — բաց թողնել at-կանոնը (կանխադրված):
- `"keep"` — թողնել այն արդյունքում անտուժ:

#### Default Value

`"remove"`
