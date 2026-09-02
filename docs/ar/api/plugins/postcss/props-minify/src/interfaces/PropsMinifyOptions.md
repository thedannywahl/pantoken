[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / PropsMinifyOptions

# واجهة: PropsMinifyOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات لـ [applyMinify](../functions/applyMinify.md).

## الخصائص

### prune?

> `optional` **prune?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

طبق [pruneCustomProps](../variables/pruneCustomProps.md) لإزالة `--instui-*` غير المستخدمة من الشجرة قبل التحويلات الأخرى.

آمن فقط للحزم المستقلة التي تحتوي على تعريفات الرموز وقواعد المكوّنات التي تشير إليها معاً.
إزالة التقليم من ورقة تحتوي على رموز فقط يحذف كل شيء.

#### القيمة الافتراضية

`false`

***

### flatten?

> `optional` **flatten?**: `boolean` \| [`FlattenPropertyOptions`](FlattenPropertyOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

طبق [flattenProperty](../variables/flattenProperty.md) لتحويل قواعد `@property` من نوع at-rule إلى تصريحات عادية.

`true` يستخدم إعدادات الملحق الافتراضية (`injectSelector: ":root"`, `onMissingInitialValue: "remove"`).
مرّر كائن [FlattenPropertyOptions](FlattenPropertyOptions.md) لتجاوز الإعدادات الافتراضية الفردية.

#### القيمة الافتراضية

`false`

***

### mangle?

> `optional` **mangle?**: `boolean` \| [`MangleCustomPropsOptions`](MangleCustomPropsOptions.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

طبق [mangleCustomProps](../variables/mangleCustomProps.md) لاستبدال أسماء `--instui-*` الطويلة بمعرّفات قصيرة.

`true` يستخدم إعدادات الملحق الافتراضية (`prefix: "--instui-"`, `method: "base26"`).
مرّر كائن [MangleCustomPropsOptions](MangleCustomPropsOptions.md) لتجاوز الإعدادات الافتراضية الفردية — بما في ذلك
`sharedManifest` للتنسيق عبر الملفات.

آمن فقط للحزم المستقلة. راجع وثائق الوحدة على مستوى الموديول.

#### القيمة الافتراضية

`false`
