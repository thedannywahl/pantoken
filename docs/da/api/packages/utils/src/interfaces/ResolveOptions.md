[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / ResolveOptions

# Interface: ResolveOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Muligheder for [makeResolver](../functions/makeResolver.md).

## Properties

### mode?

> `optional` **mode?**: [`Mode`](../type-aliases/Mode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Sammenfold `light-dark()` til denne gren; udelad for at holde `light-dark()` intakt.

---

### overrides?

> `optional` **overrides?**: readonly [`Token`](../../../core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tokens, der tilsidesætter basissættet (vinder ved navnekollisioner, f.eks. en kalders IR over et tema).
