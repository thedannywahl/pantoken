[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / ResolveOptions

# 介面: ResolveOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Options for [makeResolver](../functions/makeResolver.md).

## 屬性

### mode?

> `optional` **mode?**: [`Mode`](../../../core/src/type-aliases/Mode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Collapse `light-dark()` to this branch; omit to keep `light-dark()` intact.

***

### overrides?

> `optional` **overrides?**: readonly [`Token`](../../../core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Tokens that override the base set (win on name collisions, e.g. a caller's IR over a theme).
