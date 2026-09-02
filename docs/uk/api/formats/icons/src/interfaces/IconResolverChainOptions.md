[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / IconResolverChainOptions

# Інтерфейс: IconResolverChainOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Options shared by the icon-resolving renderers ([buildIconResolverChain](../functions/buildIconResolverChain.md)).

## Властивості

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

An explicit resolver, tried before the built-in pantoken icon set.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Plugins whose `rehype` hooks contribute resolvers (tried first).
