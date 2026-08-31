[pantoken](../../../../index.md) / [packages/utils/src](../index.md) / ResolveOptions

# Interface: ResolveOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions per a [makeResolver](../functions/makeResolver.md).

## Properties

### mode?

> `optional` **mode?**: [`Mode`](../type-aliases/Mode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Col·lapsa `light-dark()` a aquesta branca; omet-la per mantenir `light-dark()` intacta.

---

### overrides?

> `optional` **overrides?**: readonly [`Token`](../../../core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Marques que substitueixen el conjunt base (guanyen en col·lisions de noms, per exemple, IR d'una cridada sobre un tema).
