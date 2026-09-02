[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / FlattenPropertyOptions

# Ինտերֆեյս: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

[flattenProperty](../variables/flattenProperty.md)-ի ընտրանքներ:

## Առանձնահատկություններ

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կանոնի ընտրիչը, որը ստանում է հանված `--name: value` հայտարարությունները:

#### Ստանդարտ արժեք

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ինչ անել `@property` at-կանոնի հետ, որն անում չունի `initial-value` նկարագիր:

- `"remove"` — բաց թողնել at-կանոնը (կանխադրված):
- `"keep"` — թողնել այն արդյունքում անտուժ:

#### Ստանդարտ արժեք

`"remove"`
