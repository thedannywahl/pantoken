[pantoken](../../../../index.md) / [renderers/rehype/src](../index.md) / RehypeOptions

# Interfície: RehypeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Opcions per a [rehypePantokenIcons](../functions/rehypePantokenIcons.md).

## Propietats

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Un resolver explícit, provat abans del conjunt d'icones pantoken integrat.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Els plugins els ganxos `rehype` dels quals contribueixen resolvedors (provats primer).

***

### className?

> `optional` **className?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El nom de classe aplicat al contenidor emès (per defecte: `pantoken-icon`).
