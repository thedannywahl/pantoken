[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / IconResolverChainOptions

# Interface: IconResolverChainOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Options shared by the icon-resolving renderers ([buildIconResolverChain](../functions/buildIconResolverChain.md)).

## Properties

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

An explicit resolver, tried before the built-in pantoken icon set.

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Plugins whose `rehype` hooks contribute resolvers (tried first).
