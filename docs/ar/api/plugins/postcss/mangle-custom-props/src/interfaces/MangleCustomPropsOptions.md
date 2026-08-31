[pantoken](../../../../../index.md) / [plugins/postcss/mangle-custom-props/src](../index.md) / MangleCustomPropsOptions

# Interface: MangleCustomPropsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

خيارات [mangleCustomProps](../variables/mangleCustomProps.md).

## Properties

### prefix?

> `optional` **prefix?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

يتم تشويش أسماء الخصائص المخصصة فقط التي تبدأ بهذه السلسلة.

#### Default Value

`"--instui-"`

---

### method?

> `optional` **method?**: [`MangleMethod`](../type-aliases/MangleMethod.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

الخوارزمية المستخدمة لإنشاء أسماء استبدال قصيرة.

- `"base26"` — `--a`، `--b`، ...، `--z`، `--aa`، `--ab`، ... (الافتراضي؛ الأقصر للمجموعات الكبيرة)
- `"base36"` — `--0`، `--1`، ...، `--9`، `--a`، ...، `--z`، `--10`، ... (أبجدي رقمي)
- `"numeric"` — `--0`، `--1`، `--2`، ...

#### Default Value

`"base26"`

---

### propertyMap?

> `optional` **propertyMap?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

عند `true`، يضيف إدخال `mangle-map` إلى رسائل PostCSS `result.messages` بعد المعالجة.
تحتوي الرسالة على شكل `{ type: "mangle-map", plugin: "pantoken-mangle-custom-props", map: Map<string, string> }`.

#### Default Value

`false`

---

### sharedManifest?

> `optional` **sharedManifest?**: `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`Map` قابل للتغيير ومشترك عبر مراحل PostCSS متعددة.

في كل مرة، يقرأ الملحق الإدخالات الموجودة (إعادة استخدام أسمائها القصيرة) ويكتب إدخالات جديدة
(متابعة العداد من `sharedManifest.size`). مرر نفس مثيل `Map` إلى
كل استدعاء `mangleCustomProps` أو `applyMinify` يعالج ملفات CSS التي سيتم
تحميلها معاً في المتصفح — هذا يضمن أن جميع الملفات تستخدم تعيين أسماء متطابق.

معالجة ورقة الرموز أولاً بحيث يتم بذر أسماؤها في البيان قبل أن تضيف ورقات المكونات
مراجعها (عادة ما تكون متداخلة).
