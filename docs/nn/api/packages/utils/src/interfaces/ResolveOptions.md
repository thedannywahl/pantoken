[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / ResolveOptions

# Grensesnitt: ResolveOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Options for [makeResolver](../functions/makeResolver.md).

## Eigenskapar

### mode?

> `optional` **mode?**: [`Mode`](../type-aliases/Mode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Collapse `light-dark()` to this branch; omit to keep `light-dark()` intact.

***

### overrides?

> `optional` **overrides?**: readonly [`Token`](../../../core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tokens that override the base set (win on name collisions, e.g. a caller's IR over a theme).
