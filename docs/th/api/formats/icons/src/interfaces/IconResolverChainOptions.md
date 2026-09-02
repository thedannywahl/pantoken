[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / IconResolverChainOptions

# อินเทอร์เฟซ: IconResolverChainOptions

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Options shared by the icon-resolving renderers ([buildIconResolverChain](../functions/buildIconResolverChain.md)).

## คุณสมบัติ

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

An explicit resolver, tried before the built-in pantoken icon set.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Plugins whose `rehype` hooks contribute resolvers (tried first).
