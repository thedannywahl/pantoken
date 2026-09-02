[pantoken](../../../../index.md) / [packages/core/src](../index.md) / BuildTokensOptions

# Interface: BuildTokensOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Muligheder for [buildTokens](../functions/buildTokens.md).

## Egenskaber

### theme?

> `optional` **theme?**: [`Theme`](../type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Temaet, der skal løses (standard: `"rebrand"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Plugins hvis `tokens` hooks kører over IR'en (standard: ingen).

***

### includeIcons?

> `optional` **includeIcons?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Inkluder ikonlaget (standard: true).

***

### includeInstui?

> `optional` **includeInstui?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Inkluder Instructure-forfattede (Custom) glyfer (standard: true).

***

### includeLucide?

> `optional` **includeLucide?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Inkluder Lucide-glyfer (standard: true).
