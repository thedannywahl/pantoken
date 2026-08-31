[pantoken](../../../../index.md) / [tools/aggregate/src](../index.md) / Target

# Interface: Target

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

هدف اكتشف من خلال حقل `pantoken` الخاص به.

## Properties

### pkg

> **pkg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اسم الحزمة، على سبيل المثال `@pantoken/astro`.

---

### key

> **key**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مفتاح التجميع / اسم التصدير، على سبيل المثال `astro`.

---

### kind

> **kind**: `"namespace"` \| `"sideEffect"` \| `"subpath"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

كيفية تعريض الهدف:

- `namespace` — إعادة تصدير في البرميل المتوقع _و_ كمسار فرعي.
- `sideEffect` — استيراد المسار الفرعي من مدخل `/inject` للحزمة؛ أيضاً في البرميل.
- `subpath` — مسار فرعي فقط، يتم إبقاؤه خارج البرميل المتوقع (للأقران الثقيلين مثل React، بحيث
  لا يحمل `import "pantoken"` أبداً).
