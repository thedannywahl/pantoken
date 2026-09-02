[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / ResolveOptions

# 인터페이스: ResolveOptions

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Options for [makeResolver](../functions/makeResolver.md).

## 속성

### mode?

> `optional` **mode?**: [`Mode`](../type-aliases/Mode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Collapse `light-dark()` to this branch; omit to keep `light-dark()` intact.

***

### overrides?

> `optional` **overrides?**: readonly [`Token`](../../../core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Tokens that override the base set (win on name collisions, e.g. a caller's IR over a theme).
