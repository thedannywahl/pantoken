[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / ResolveOptions

# Interface: ResolveOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Options for [makeResolver](../functions/makeResolver.md).

## Propriétés

### mode?

> `optional` **mode?**: [`Mode`](../../../core/src/type-aliases/Mode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Collapse `light-dark()` to this branch; omit to keep `light-dark()` intact.

***

### overrides?

> `optional` **overrides?**: readonly [`Token`](../../../core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Tokens that override the base set (win on name collisions, e.g. a caller's IR over a theme).
