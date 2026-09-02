[pantoken](../../../../index.md) / [packages/core/src](../index.md) / BuildTokensOptions

# Comhéadan: BuildTokensOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Options for [buildTokens](../functions/buildTokens.md).

## Airíonna

### theme?

> `optional` **theme?**: [`Theme`](../type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

The theme to resolve (default: `"rebrand"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Plugins whose `tokens` hooks run over the IR (default: none).

***

### includeIcons?

> `optional` **includeIcons?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Include the icon layer (default: true).

***

### includeInstui?

> `optional` **includeInstui?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Include Instructure-authored (Custom) glyphs (default: true).

***

### includeLucide?

> `optional` **includeLucide?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Include Lucide glyphs (default: true).
