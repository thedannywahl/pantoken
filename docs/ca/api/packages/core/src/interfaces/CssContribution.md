[pantoken](../../../../index.md) / [packages/core/src](../index.md) / CssContribution

# Interface: CssContribution

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Una contribució CSS que un connector pot retornar del seu ganxo `css`.

## Properties

### prepend?

> `optional` **prepend?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS brut emès abans de la base generada.

---

### append?

> `optional` **append?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS brut emès després de la base generada.

---

### properties?

> `optional` **properties?**: `PropertyRule`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Registres tipificats de `@property` per afegir.

---

### declarations?

> `optional` **declarations?**: \[`string`, `string`\][]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Declaracions delimitades de `--var: value` per afegir.

---

### marker?

> `optional` **marker?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un marcador `data-*` per al bloc emès, per a depuració.
