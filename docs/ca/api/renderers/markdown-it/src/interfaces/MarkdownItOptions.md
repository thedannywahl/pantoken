[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / MarkdownItOptions

# Interfície: MarkdownItOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Opcions per a [pantokenMarkdownIt](../functions/pantokenMarkdownIt.md).

## Propietats

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Un resolvedor d'icona explícit, provat després dels resolvedors de connectors i abans del conjunt integrat.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Els connectors els ganxos `rehype` dels quals contribueixen resolvedors d'icones (proven primer).

***

### iconClassName?

> `optional` **iconClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

La classe aplicada a l'envolvent d'icona (per defecte: `pantoken-icon`).

***

### swatchClassName?

> `optional` **swatchClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

La classe aplicada a l'envolvent de mostra de color (per defecte: `pantoken-color-swatch`).

***

### icons?

> `optional` **icons?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Representa els codis `:icon:` com SVG en línia (per defecte: `true`).

***

### swatches?

> `optional` **swatches?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Representa els valors de color autònoms com mostres (per defecte: `true`).
