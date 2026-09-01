[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / ResolveOptions

# واجهة: ResolveOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات لـ [makeResolver](../functions/makeResolver.md).

## الخصائص

### mode?

> `optional` **mode?**: [`Mode`](../../../core/src/type-aliases/Mode.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اطوِ `light-dark()` إلى هذا الفرع؛ إن لم تفعل فستبقى `light-dark()` كما هي.

***

### overrides?

> `optional` **overrides?**: readonly [`Token`](../../../core/src/interfaces/Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الرموز التي تتجاوز مجموعة الأساس (تتفوق عند تعارض الأسماء، مثلاً IR الخاص بالمستدعي مقابل السمة).
