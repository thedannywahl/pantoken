[pantoken](../../../../index.md) / [packages/model/src](../index.md) / Token

# Interface: Token

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Et enkelt designtoken i den kanoniske `@property`-justerede IR.

## Egenskaber

### name

> **name**: `string`

Custom-property-navnet, f.eks. `--instui-color-background-base`.

***

### syntax

> **syntax**: `string`

Beskrivelsen `@property` `syntax` (`"&lt;color&gt;"`, `"&lt;length&gt;"`,
  `"&lt;image&gt;"`, …) eller `"*"` for kontekstuelle værdier.

***

### inherits

> **inherits**: `boolean`

Flaget `@property` `inherits`.

***

### value

> **value**: `string`

En konkret værdi, en `var(...)` reference eller et `light-dark(a, b)` par.

***

### themed?

> `optional` **themed?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Sandt, når lys- og mørkeropløsningerne adskiller sig (værdi er en `light-dark()`).

***

### refersTo?

> `optional` **refersTo?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tokenen, som denne refererer til, når `value` er en enkelt `var(...)`.

***

### meta?

> `optional` **meta?**: [`TokenMeta`](TokenMeta.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ikke-værdi-metadata.
