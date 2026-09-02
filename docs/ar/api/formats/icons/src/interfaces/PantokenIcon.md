[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / PantokenIcon

# واجهة: PantokenIcon

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

أيقونة pantoken، مشتقة من توكن `&lt;image&gt;`.

## الخصائص

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اسم الأيقونة، بدون بادئة `--instui-icon-` (مثال: `arrow-left`).

***

### dataUri

> **dataUri**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

قيمة `url('data:image/svg+xml;utf8,…')` كما هي مخزنة في IR.

***

### svg

> **svg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

علامة SVG المضمنة المفكوكة، بعد إزالة عناصر `&lt;script&gt;` وسمات معالجات الأحداث.
مأخوذة من IR المزود (مثبتة upstream). آمنة لسياقات الحقن الموثوقة;
يجب ألا يعتبرها المستهلكون آمنة للحقن في HTML يتحكم به المهاجمون.

***

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الـ SVG `viewBox`، إذا كان معروفًا.

***

### bidirectional

> **bidirectional**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

ما إذا كانت الأيقونة تنعكس أفقيًا في سياقات من اليمين إلى اليسار.

***

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

أصل الرمز.
