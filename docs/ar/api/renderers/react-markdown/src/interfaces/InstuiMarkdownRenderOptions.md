[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdownRenderOptions

# واجهة: InstuiMarkdownRenderOptions

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خيارات العرض التي تضبط كيف يتم تحويل Markdown إلى واجهة Instructure UI.

## الخصائص

### link?

> `optional` **link?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

سلوك الروابط.

#### external?

> `optional` **external?**: `boolean`

عرض مؤشر رابط خارجي على الروابط المؤدية لمواقع خارجية (الافتراضي: true).

#### permalinks?

> `optional` **permalinks?**: `boolean`

إضافة مراسي روابط دائمة للعناوين (الافتراضي: false).

#### permalinkClassName?

> `optional` **permalinkClassName?**: `string`

اسم الصنف لمراسي الرابط الدائم (الافتراضي: `pantoken-heading-anchor`).

***

### code?

> `optional` **code?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

سلوك كتل الشيفرة المحاطة.

#### language?

> `optional` **language?**: `boolean`

الحفاظ على تلميح اللغة كخاصية `data-language` (الافتراضي: true).

***

### icons?

> `optional` **icons?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

سلوك وسم `:icon:` داخل السطر.

#### enabled?

> `optional` **enabled?**: `boolean`

تمكين عرض `:icon:` (الافتراضي: true).

#### color?

> `optional` **color?**: `string`

لون CSS المطبق على الأيقونات المعروضة.

#### resolvers?

> `optional` **resolvers?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)[]

محللات إضافية تُجرَّب قبل مجموعة أيقونات pantoken المدمجة.

#### plugins?

> `optional` **plugins?**: [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

الإضافات التي تساهم خطاطيف `rehype` الخاصة بها بمحللات (مثال: simple-icons).

***

### color?

> `optional` **color?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

عينات ألوان ضمن السطر (مثال: `#03893D`).

#### enabled?

> `optional` **enabled?**: `boolean`

تمكين عينات الألوان (الافتراضي: true).

***

### alerts?

> `optional` **alerts?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

تنبيهات اقتباس الكتلة على نمط GitHub.

#### enabled?

> `optional` **enabled?**: `boolean`

تمكين تحويل `> [!NOTE]` → تحذير InstUI (الافتراضي: true).

***

### tableCaption?

> `optional` **tableCaption?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

التسمية المستخدمة للجداول المعروضة (مطلوبة من InstUI Table لإمكانية الوصول).
