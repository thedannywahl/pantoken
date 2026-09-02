[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / FlattenPropertyOptions

# Interfície: FlattenPropertyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions per a [flattenProperty](../variables/flattenProperty.md).

## Propietats

### injectSelector?

> `optional` **injectSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El selector de la regla que rep les declaracions `--name: value` extretes.

#### Valor predeterminat

`":root"`

***

### onMissingInitialValue?

> `optional` **onMissingInitialValue?**: `"remove"` \| `"keep"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Què fer amb una at-rule `@property` que no té cap descriptor `initial-value`.

- `"remove"` — descarta la at-rule (per defecte).
- `"keep"` — deixa-ho en la sortida sense tocar.

#### Valor predeterminat

`"remove"`
