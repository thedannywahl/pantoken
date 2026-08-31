[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / PantokenIcon

# Interface: PantokenIcon

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

رمز pantoken، مشتق من رمز `&lt;image&gt;`.

## Properties

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اسم الرمز، بدون بادئة `--instui-icon-` (مثال `arrow-left`).

---

### dataUri

> **dataUri**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

قيمة `url('data:image/svg+xml;utf8,…')`، كما هي مخزنة في IR.

---

### svg

> **svg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

علامات SVG المضمنة المفككة، المحررة من عناصر `&lt;script&gt;` وخصائص معالج الأحداث.
يأتي من IR المباع (مثبت في المصب). آمن لسياقات الحقن الموثوقة؛
لا يجب أن يعتبر المستهلكون هذا آمناً للحقن في HTML يتحكم به المهاجم.

---

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

SVG `viewBox`، عند معرفته.

---

### bidirectional

> **bidirectional**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

ما إذا كان الرمز ينقلب أفقياً في السياقات من اليمين إلى اليسار.

---

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

أصل الحرف.
