[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / BuildPendoCssOptions

# Interface: BuildPendoCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

خيارات لـ [buildPendoCss](../functions/buildPendoCss.md).

## Properties

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

المظهر الذي يحصل منه على طبقة `--instui-*` (الافتراضي `"rebrand"`).

---

### scopeSelector?

> `optional` **scopeSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

محدد جذر `@scope` (الافتراضي `._pendo-step-container`).

---

### scope?

> `optional` **scope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

لف قواعد المكون في `@scope` للحجز في DOM (الافتراضي `true`).

---

### important?

> `optional` **important?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

أضف `!important` إلى إعلانات المكون حتى تتفوق على أنماط Pendo (الافتراضي `true`).

---

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اهز الشجرة من الرمزات `--instui-*` غير المستخدمة (الافتراضي `true`؛ يشحن الإيقاف مجموعة الرمزات الكاملة).

---

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تحويل قواعد `@property` إلى إعلانات خصائص مخصصة عادية عبر
[flattenProperty](../../../../plugins/postcss/props-minify/src/variables/flattenProperty.md) (الافتراضي `false`). `true` يستخدم إعدادات الإضافة مع
`injectSelector: ":scope"` حتى تصل الإعلانات داخل كتلة `@scope`.
مرر كائن [FlattenPropertyOptions](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md) لتجاوز الإعدادات الفردية.

---

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

شوه أسماء `--instui-*` إلى معرفات أساس 26 الحد الأدنى عبر [mangleCustomProps](../../../../plugins/postcss/props-minify/src/variables/mangleCustomProps.md)
(الافتراضي `false`). آمن هنا لأن الرمزة الكاملة + ورقة أنماط المكون عبارة عن
حزمة مكتفية ذاتيًا. مرر كائن [MangleCustomPropsOptions](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md) لتجاوز الإعدادات الافتراضية.
