[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / RehypeOptions

# Interface: RehypeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Valgmuligheder for [rehypePantokenIcons](../functions/rehypePantokenIcons.md).

## Properties

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

En eksplicit opløser, prøvet før det indbyggede pantoken-ikonsæt.

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Plugins, hvis `rehype` hooks bidrager med opløsere (prøves først).

---

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Klassenavet brugt på den udsendte wrapper (standard: `pantoken-icon`).
