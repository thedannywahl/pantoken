[pantoken](../../../../index.md) / [packages/core/src](../index.md) / BuildTokensOptions

# Interfície: BuildTokensOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions per a [buildTokens](../functions/buildTokens.md).

## Propietats

### theme?

> `optional` **theme?**: [`Theme`](../type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El tema a resoldre (per defecte: `"rebrand"`).

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Connectors els ganxos `tokens` dels quals s'executen sobre l'IR (per defecte: cap).

***

### includeIcons?

> `optional` **includeIcons?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Inclou la capa d'icona (per defecte: cert).

***

### includeInstui?

> `optional` **includeInstui?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Inclou glifos creats per Instructure (personalitzats) (per defecte: cert).

***

### includeLucide?

> `optional` **includeLucide?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Inclou glifos Lucide (per defecte: cert).
