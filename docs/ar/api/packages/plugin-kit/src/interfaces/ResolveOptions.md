[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / ResolveOptions

# Interface: ResolveOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

خيارات [makeResolver](../functions/makeResolver.md).

## Properties

### mode?

> `optional` **mode?**: [`Mode`](../../../core/src/type-aliases/Mode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اطو `light-dark()` إلى هذا الفرع؛ حذف للحفاظ على `light-dark()` سليمة.

---

### overrides?

> `optional` **overrides?**: readonly [`Token`](../../../core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

الرموز التي تلغي المجموعة الأساسية (تفوز على تضارب الأسماء، على سبيل المثال، IR المتصل فوق المظهر).
