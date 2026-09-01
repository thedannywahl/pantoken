[pantoken](../../../../../index.md) / [plugins/postcss/mangle-custom-props/src](../index.md) / MangleCustomPropsOptions

# واجهة: MangleCustomPropsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات __PTK_INLINE_CODE_0__ لمعالجة [mangleCustomProps](../variables/mangleCustomProps.md).

## الخصائص

### prefix?

> `optional` **prefix?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

سيتم تشفير أسماء الخصائص المخصصة فقط إذا كانت تبدأ بهذه السلسلة.

#### القيمة الافتراضية

`"--instui-"`

***

### method?

> `optional` **method?**: [`MangleMethod`](../type-aliases/MangleMethod.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الخوارزمية المستخدمة لتوليد أسماء بديلة قصيرة.

- `"base26"` — `--a`, `--b`, …, `--z`, `--aa`, `--ab`, … (الافتراضي؛ الأقصر للمجموعات الكبيرة)
- `"base36"` — `--0`, `--1`, …, `--9`, `--a`, …, `--z`, `--10`, … (أبجدي رقمي)
- `"numeric"` — `--0`, `--1`, `--2`, …

#### القيمة الافتراضية

`"base26"`

***

### propertyMap?

> `optional` **propertyMap?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

عند `true`، يُضاف إدخال `mangle-map` إلى `result.messages` الخاص بـ PostCSS بعد المعالجة.
الشكل العام للرسالة هو `{ type: "mangle-map", plugin: "pantoken-mangle-custom-props", map: Map<string, string> }`.

#### القيمة الافتراضية

`false`

***

### sharedManifest?

> `optional` **sharedManifest?**: `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`Map` قابل للتغيير ومشترك عبر تمريرات PostCSS متعددة.

في كل تمريرة يقرأ الملحق الإدخالات الموجودة (مستعملاً أسماؤها القصيرة القائمة) ويكتب إدخالات جديدة
(مُتابعًا العداد من `sharedManifest.size`). مرِّر نفس مثيل `Map` إلى كل استدعاء `mangleCustomProps` أو `applyMinify` الذي يعالج ملفات CSS التي ستُحمَّل معًا في المتصفح — هذا يضمن أن جميع الملفات تستخدم تخطيط أسماء مطابق.

عالج ورقة الرموز أولاً حتى تُزرع أسماؤها في البيان (manifest) قبل أن تضيف أوراق المكوّنات مراجعها (التي عادةً ما تتداخل).
