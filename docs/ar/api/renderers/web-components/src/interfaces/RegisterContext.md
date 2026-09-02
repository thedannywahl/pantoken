[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / RegisterContext

# واجهة: RegisterContext

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

الحالة المشتركة التي يبنِيها نداء `register()` مرة واحدة وتُمرَّر إلى كل [ElementDefinition](ElementDefinition.md).
تحمل محول السجل المدرك للبريفكس، المُساعد `tag()` للعلامات المتداخلة، بادئة فئات CSS
`I`، علم + موجه دعم أوامر Invoker، المصنّعات `wrapper`/`variantClass`/`iconSvg`، وبيانات المنطقة (locale) (`strings`, `locale`, `dir`, `firstDay`).

## الخصائص

### registry

> **registry**: [`ElementRegistry`](ElementRegistry.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

السجل بنطاق محدد: يعيد كتابة `instui-&lt;base&gt;` → الوسم النشط-البادئة على `get`/`define`.

***

### tag

> **tag**: (`base`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

ربط اسم قاعدة إلى وسم البادئة النشط (للعلامات المتداخلة، `querySelector`, `tagName`).

#### المعلمات

##### base

`string`

#### القيم المرجعة

`string`

***

### I

> **I**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

بادئة فئة CSS لأوراق المكوّن المدرجة — دائمًا `instui`، منفصلة عن بادئة الوسم.

#### prefix

> `readonly` **prefix**: `"instui"`

***

### invokerSupported

> **invokerSupported**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

ما إذا كان المتصفح يدعم واجهة أوامر Invoker (`command`/`commandfor`).

***

### onCommand

> **onCommand**: `OnCommand`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

توجيه أحداث `command` للهدف (أو ارتداد النقر) إلى معالج.

***

### wrapper

> **wrapper**: (`tag`, `css`, `render`, `options?`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تعريف عنصر ظل DOM: `&lt;style&gt;:host{display}css&lt;/style&gt;` + العلامة من `render(host)`.
يقوم `invoker: true` بتمرير `popovertarget`/`command` للمستضيف إلى `&lt;button&gt;` الداخلي (IDL).

#### المعلمات

##### tag

`string`

##### css

`string`

##### render

(`host`) => `string`

##### options?

###### display?

`string`

###### invoker?

`boolean`

#### القيم المرجعة

`void`

***

### variantClass

> **variantClass**: (`name`, `host`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

بناء فئة `.instui-&lt;name&gt;` مع مُعدّل اختياري `-color-&lt;variant&gt;` من `variant`.

#### المعلمات

##### name

`string`

##### host

`HTMLElement`

#### القيم المرجعة

`string`

***

### iconSvg

> **iconSvg**: (`name`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

حل اسم الأيقونة إلى SVG مضمن (سلسلة فارغة إذا لم تُعرف).

#### المعلمات

##### name

`string`

#### القيم المرجعة

`string`

***

### locale

> **locale**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

وسم لغة BCP47 المستخدم لتنسيق `toLocaleDateString` و `Intl`.

***

### dir

> **dir**: `"ltr"` \| `"rtl"`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

اتجاه النص المستمد من حزمة اللغة النشطة.

***

### firstDay

> **firstDay**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

أول يوم في الأسبوع كمؤشر JS `Date.getDay()` (0=الأحد … 6=السبت).

***

### strings

> **strings**: [`WebComponentStrings`](WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

سلاسل واجهة المستخدم المترجمة لجميع العناصر السلوكية.
