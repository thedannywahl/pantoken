[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / ResolveOptions

# Comhéadan: ResolveOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Options for [makeResolver](../functions/makeResolver.md).

## Airíonna

### mode?

> `optional` **mode?**: [`Mode`](../../../core/src/type-aliases/Mode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Collapse `light-dark()` to this branch; omit to keep `light-dark()` intact.

***

### overrides?

> `optional` **overrides?**: readonly [`Token`](../../../core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Tokens that override the base set (win on name collisions, e.g. a caller's IR over a theme).
