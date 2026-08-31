[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / PropsMinifyOptions

# Interface: PropsMinifyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

خيارات [applyMinify](../functions/applyMinify.md).

## Properties

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تطبيق [pruneCustomProps](../variables/pruneCustomProps.md) لإزالة رموز `--instui-*` غير المستخدمة قبل التحويلات الأخرى.

آمن فقط للحزم المكتفية ذاتياً التي تحتوي على تعريفات الرموز والقواعد المكونة
التي تشير إليها. حذف ورقة الرموز فقط يزيل كل شيء.

#### Default Value

`false`

---

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تطبيق [flattenProperty](../variables/flattenProperty.md) لتحويل قواعد `@property` إلى تصريحات عادية.

`true` يستخدم الإعدادات الافتراضية للمكون الإضافي (`injectSelector: ":root"`، `onMissingInitialValue: "remove"`).
مرّر كائن [FlattenPropertyOptions](FlattenPropertyOptions.md) لتجاوز الإعدادات الافتراضية الفردية.

#### Default Value

`false`

---

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

طبّق [mangleCustomProps](../variables/mangleCustomProps.md) لاستبدال أسماء `--instui-*` الطويلة بمعرّفات قصيرة.

`true` يستخدم الإعدادات الافتراضية للمكون الإضافي (`prefix: "--instui-"`، `method: "base26"`).
مرّر كائن [MangleCustomPropsOptions](MangleCustomPropsOptions.md) لتجاوز الإعدادات الافتراضية الفردية — بما في ذلك
`sharedManifest` للتنسيق بين الملفات.

آمن فقط للحزم المكتفية بذاتها. راجع وثائق مستوى الوحدة.

#### Default Value

`false`
