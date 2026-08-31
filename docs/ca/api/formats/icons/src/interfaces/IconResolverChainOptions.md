[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / IconResolverChainOptions

# Interface: IconResolverChainOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions compartides pels processadors de resolució d'icones ([buildIconResolverChain](../functions/buildIconResolverChain.md)).

## Properties

### resolve?

> `optional` **resolve?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un resolver explícit, provat abans del conjunt d'icones pantoken integrat.

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Els plugins els ganxos `rehype` dels quals contribueixen resolvedors (provats primer).
