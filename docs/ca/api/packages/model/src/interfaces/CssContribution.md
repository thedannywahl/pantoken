[pantoken](../../../../index.md) / [packages/model/src](../index.md) / CssContribution

# Interfície: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Una contribució CSS que un connector pot retornar del seu ganxo `css`.

## Propietats

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS brut emès abans de la base generada.

***

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS brut emès després de la base generada.

***

### properties?

> `optional` **properties?**: [`PropertyRule`](PropertyRule.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Registres tipificats de `@property` per afegir.

***

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Declaracions delimitades de `--var: value` per afegir.

***

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un marcador `data-*` per al bloc emès, per a depuració.
