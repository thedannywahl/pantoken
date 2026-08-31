[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / InstuiMarkdownRenderOptions

# Interface: InstuiMarkdownRenderOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

خيارات العرض التي تضبط كيفية تعيين Markdown على Instructure UI.

## Properties

### link?

> `optional` **link?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

سلوك الرابط.

#### external?

> `optional` **external?**: `boolean`

إظهار عنصر ارتباط خارجي على الروابط خارج الموقع (الافتراضي: true).

#### permalinks?

> `optional` **permalinks?**: `boolean`

إضافة أنسام الارتباطات الدائمة إلى العناوين (الافتراضي: false).

#### permalinkClassName?

> `optional` **permalinkClassName?**: `string`

اسم الفئة لأنسام الارتباطات الدائمة (الافتراضي: `pantoken-heading-anchor`).

---

### code?

> `optional` **code?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

سلوك كتل الأكواد المحاطة.

#### language?

> `optional` **language?**: `boolean`

الحفاظ على تلميح اللغة كسمة `data-language` (الافتراضي: true).

---

### icons?

> `optional` **icons?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

سلوك رمز `:icon:` المضمن.

#### enabled?

> `optional` **enabled?**: `boolean`

تفعيل عرض `:icon:` (الافتراضي: true).

#### color?

> `optional` **color?**: `string`

لون CSS المطبق على الأيقونات المعروضة.

#### resolvers?

> `optional` **resolvers?**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)[]

محللات إضافية، يتم محاولتها قبل مجموعة أيقونات pantoken المدمجة.

#### plugins?

> `optional` **plugins?**: [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

المكونات الإضافية التي تساهم خطافاتها `rehype` في المحللات (مثل simple-icons).

---

### color?

> `optional` **color?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

عينات ألوان مشفرة مضمنة (مثل `#03893D`).

#### enabled?

> `optional` **enabled?**: `boolean`

تفعيل عينات الألوان (الافتراضي: true).

---

### alerts?

> `optional` **alerts?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تنبيهات الاقتباس بأسلوب GitHub.

#### enabled?

> `optional` **enabled?**: `boolean`

تفعيل تعيين `> [!NOTE]` → InstUI Alert (الافتراضي: true).

---

### tableCaption?

> `optional` **tableCaption?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

الشرح المستخدم للجداول المعروضة (مطلوب بواسطة InstUI Table للوصول).
