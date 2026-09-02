[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / IconResolverChainOptions

# Interface: IconResolverChainOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Muligheder delt af ikonopløsningsrendererne ([buildIconResolverChain](../functions/buildIconResolverChain.md)).

## Egenskaber

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

En eksplicit opløser, prøvet før det indbyggede pantoken-ikonsæt.

***

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Plugins, hvis `rehype` hooks bidrager med opløsere (prøves først).
