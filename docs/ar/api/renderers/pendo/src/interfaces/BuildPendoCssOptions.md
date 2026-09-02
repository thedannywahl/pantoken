[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / BuildPendoCssOptions

# واجهة: BuildPendoCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات لـ [buildPendoCss](../functions/buildPendoCss.md).

## الخصائص

### theme?

> `optional` **theme?**: [`Theme`](../../../../packages/core/src/type-aliases/Theme.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

السمة المصدر لطبقة `--instui-*` (الافتراضي `"rebrand"`).

***

### scopeSelector?

> `optional` **scopeSelector?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

The `@scope` root selector (default `[class*="instui"]._pendo-step-container`).

***

### scope?

> `optional` **scope?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

لف قواعد المكوّن داخل `@scope` لعزل DOM (الافتراضي `true`).

***

### important?

> `optional` **important?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

أضف `!important` إلى إعلانات المكوّن حتى تتجاوز أنماط Pendo (الافتراضي `true`).

***

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

قم بإزالة الشجرية للرموز `--instui-*` غير المستخدمة (الافتراضي `true`; التعطيل يُرسل مجموعة الرموز كاملة).

***

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

حوّل قواعد at- الخاصة بـ `@property` إلى تصريحات خصائص مخصصة عادية عبر
[flattenProperty](../../../../plugins/postcss/props-minify/src/variables/flattenProperty.md) (الافتراضي `false`). `true` يستخدم قيم الإضافة الافتراضية مع
`injectSelector: ":scope"` بحيث تندرج التصريحات داخل كتلة `@scope`.
مرّر كائن [FlattenPropertyOptions](../../../../plugins/postcss/props-minify/src/interfaces/FlattenPropertyOptions.md) لتجاوز الافتراضات الفردية.

***

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

شوِّه أسماء `--instui-*` إلى معرفات أساسية موجزة بنظام الأساس-26 عبر [mangleCustomProps](../../../../plugins/postcss/props-minify/src/variables/mangleCustomProps.md)
(الافتراضي `false`). هذا آمن هنا لأن مجموعة الرموز الكاملة وورقة أنماط المكوّن هي
حزمة مكتفية ذاتيًا. مرّر كائن [MangleCustomPropsOptions](../../../../plugins/postcss/props-minify/src/interfaces/MangleCustomPropsOptions.md) لتجاوز الافتراضات.
