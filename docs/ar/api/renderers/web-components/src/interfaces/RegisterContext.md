[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / RegisterContext

# Interface: RegisterContext

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

الحالة المشتركة التي تنشئها استدعاء `register()` مرة واحدة وتمريرها إلى كل [ElementDefinition](ElementDefinition.md).
يحمل محول السجل الموعي بالبادئة، والمساعد `tag()` للترميز المتداخل، بادئة فئة CSS `I`، علم دعم أوامر المستدعي + الموجه، مصانع `wrapper`/`variantClass`/`iconSvg`،
وبيانات الإقليم (`strings`, `locale`, `dir`, `firstDay`).

## Properties

### registry

> **registry**: [`ElementRegistry`](ElementRegistry.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

السجل المحدد النطاق: يعيد كتابة `instui-&lt;base&gt;` → العلامة ذات البادئة النشطة على `get`/`define`.

---

### tag

> **tag**: (`base`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

خريطة اسم أساسي إلى العلامة ذات البادئة النشطة (للترميز المتداخل، `querySelector`, `tagName`).

#### Parameters

##### base

`string`

#### Returns

`string`

---

### I

> **I**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

بادئة فئة CSS لأوراق المكونات المضمنة — دائمًا `instui`، منفصلة عن بادئة العلامة.

#### prefix

> `readonly` **prefix**: `"instui"`

---

### invokerSupported

> **invokerSupported**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

ما إذا كان المتصفح يدعم API أوامر المستدعي (`command`/`commandfor`).

---

### onCommand

> **onCommand**: `OnCommand`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

توجيه أحداث `command` للهدف (أو بديل النقر) إلى معالج.

---

### wrapper

> **wrapper**: (`tag`, `css`, `render`, `options?`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

عرّف عنصر DOM الظل: `&lt;style&gt;:host{display}css&lt;/style&gt;` + الترميز من `render(host)`.
`invoker: true` يعيد توجيه `popovertarget`/`command` المضيف إلى `&lt;button&gt;` الداخلي (IDL).

#### Parameters

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

#### Returns

`void`

---

### variantClass

> **variantClass**: (`name`, `host`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

بناء فئة `.instui-&lt;name&gt;` مع معدل `-color-&lt;variant&gt;` اختياري من `variant`.

#### Parameters

##### name

`string`

##### host

`HTMLElement`

#### Returns

`string`

---

### iconSvg

> **iconSvg**: (`name`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

حل اسم الرمز إلى SVG مضمن (سلسلة فارغة عند عدم معرفته).

#### Parameters

##### name

`string`

#### Returns

`string`

---

### locale

> **locale**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

علامة إقليم BCP47 المستخدمة لتنسيق `toLocaleDateString` و `Intl`.

---

### dir

> **dir**: `"ltr"` \| `"rtl"`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

اتجاه النص المشتق من حزمة الإقليم النشطة.

---

### firstDay

> **firstDay**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

اليوم الأول من الأسبوع كفهرس JS `Date.getDay()` (0=الأحد … 6=السبت).

---

### strings

> **strings**: [`WebComponentStrings`](WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

سلاسل واجهة المستخدم المترجمة لجميع العناصر السلوكية.
