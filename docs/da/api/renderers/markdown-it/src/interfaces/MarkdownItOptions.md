[pantoken](../../../../index.md) / [renderers/markdown-it/src](../index.md) / MarkdownItOptions

# Interface: MarkdownItOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Indstillinger for [pantokenMarkdownIt](../functions/pantokenMarkdownIt.md).

## Egenskaber

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

En eksplicit ikonresolver, forsøgt efter plugin-resolvere og før det built-in sæt.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Plugins hvis `rehype` hooks bidrager med ikonresolvere (forsøgt først).

***

### iconClassName?

> `optional` **iconClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Klassen anvendt på ikonomslaget (standard: `pantoken-icon`).

***

### swatchClassName?

> `optional` **swatchClassName?**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Klassen anvendt på farve-swatch omslaget (standard: `pantoken-color-swatch`).

***

### icons?

> `optional` **icons?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Gengiv `:icon:` koder som inline SVG (standard: `true`).

***

### swatches?

> `optional` **swatches?**: `boolean`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Gengiv uafhængige farveværdier som farveskemaer (standard: `true`).
