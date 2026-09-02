[pantoken](../../../../index.md) / [packages/core/src](../index.md) / BuildTokensOptions

# Интерфейс: BuildTokensOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Options for [buildTokens](../functions/buildTokens.md).

## Свойства

### theme?

> `optional` **theme?**: [`Theme`](../type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The theme to resolve (default: `"rebrand"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Plugins whose `tokens` hooks run over the IR (default: none).

***

### includeIcons?

> `optional` **includeIcons?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Include the icon layer (default: true).

***

### includeInstui?

> `optional` **includeInstui?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Include Instructure-authored (Custom) glyphs (default: true).

***

### includeLucide?

> `optional` **includeLucide?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Include Lucide glyphs (default: true).
