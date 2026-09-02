[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / IconResolverChainOptions

# Interfáhta: IconResolverChainOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Options shared by the icon-resolving renderers ([buildIconResolverChain](../functions/buildIconResolverChain.md)).

## Properties

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

An explicit resolver, tried before the built-in pantoken icon set.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Plugins whose `rehype` hooks contribute resolvers (tried first).
