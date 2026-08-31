[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / CssDocEntry

# Interface: CssDocEntry

سجل CSS موثّق واحد: فئته الأساسية بالإضافة إلى كل شيء مشتق من CSS + تعليقات الوثائق.

## Properties

### name

> **name**: `string`

اسم السجل من `@component`/`@utility`/`@rule`/`@declaration`/`@name`، على سبيل المثال `button`.

---

### kind

> **kind**: `CssRecordKind`

نوع سطح CSS الذي توثقه (الافتراضي هو `component`).

---

### className

> **className**: `string`

محدد CSS الأساسي — فئة (`.button`)، سمة (`[data-layout="x"]`)، معرّف (`#foo`),
أو shadow-DOM pseudo (`:host`) — مشتق من القاعدة الأولى bare-class أو تعيينه بشكل صريح عبر
`@selector`. دائماً غير فارغ (يرجع إلى `.${name}` عند فشل الاستدلال).

---

### summary?

> `optional` **summary?**: `string`

ملخص سطر واحد من `@summary`.

---

### remarks?

> `optional` **remarks?**: `string`

نثر موسع من `@remarks`.

---

### privateRemarks?

> `optional` **privateRemarks?**: `string`

نثر داخلي فقط من `@privateRemarks` (قد تختار الباعثات حذفه من الإخراج العام).

---

### releaseStage?

> `optional` **releaseStage?**: `CssReleaseStage`

مرحلة الإصدار من علامة المعدّل (`@alpha`/`@beta`/`@experimental`/`@internal`/`@public`).

---

### since?

> `optional` **since?**: `string`

الإصدار المقدم، من `@since`.

---

### group?

> `optional` **group?**: `string`

مجموعة/فئة توثيق، من `@group`/`@category`.

---

### accessibility?

> `optional` **accessibility?**: `string`

إرشادات الوصول، من `@a11y`/`@accessibility`.

---

### global?

> `optional` **global?**: `boolean`

تعيين عندما يحمل هذا السجل علامة `@global` — معدّلاته (وعلامات `@global` لكل معدّل)
تنطبق على أي component/layout/rule/declaration، وليس فقط فئته الأساسية. يُستخدم أثناء
فحوصات التحقق والاستهلاك لحل تطابقات المعدّل عالمياً.

---

### modifiers

> **modifiers**: `CssModifier`[]

معدّلات مستخرجة من AST، معلقة مع نثر `@modifier` حيث تم تأليفها.

---

### parts

> **parts**: `CssPart`[]

أجزاء العنصر الفرعي المستخرجة من AST (قائمة على الفئة)، معلقة مع نثر `@part` حيث تم تأليفها.

---

### shadowParts

> **shadowParts**: `CssPart`[]

أجزاء Shadow-DOM المكشوفة (`::part(name)`)، من `@csspart` أو محدد `::part()`.

---

### pseudoElements

> **pseudoElements**: `CssPseudoElement`[]

عناصر pseudo الأصلية التي يصمتها المكون (`::before`، `::marker`، ...)، من `@pseudo` أو محدد.

---

### states

> **states**: `CssState`[]

الحالات التي يتفاعل معها المكون، من `@cssstate`، `:state()`، pseudo-classes، أو فئات الحالة.

---

### slots

> **slots**: `CssSlot`[]

الفتحات المسماة التي يكشفها غلاف المكون، من `@slot`.

---

### elements?

> `optional` **elements?**: `CssElementConstraints`

عناصر HTML المسموحة من `@element` (الافتراضي + الملفات الشخصية المسماة الاختيارية).

---

### todos

> **todos**: `string`[]

ملاحظات المهام الداخلية، من علامات `@todo` وتعليقات `/* @todo … */` المضمنة. ملاحظات التطوير،
ليس API عام — قد تحذفها الباعثات (مثل [CssDocEntry.privateRemarks](#privateremarks)).

---

### cssPropertiesConsumed

> **cssPropertiesConsumed**: `CssTokenConsumed`[]

رموز التصميم التي يستهلكها هذا المكون: كل خاصية مخصصة `--*` مرجعية عبر `var(...)` داخل
قواعده، كل واحدة معلقة مع نثر `@tokens` حيث تم تأليفها (ويشمل أي رمز معلن بـ `@tokens`
غير الموجود حرفياً عبر `var()`).

---

### cssPropertiesDeclared

> **cssPropertiesDeclared**: `CssPropertyDeclared`[]

الخصائص المخصصة التي يعلنها هذا المكون (`@property`) أو يوثقها (`@cssproperty`).

---

### functions

> **functions**: `CssFunction`[]

دوال CSS المخصصة (`@function`) التي يحددها هذا المكون.

---

### animations

> **animations**: `CssAnimation`[]

الرسوم المتحركة (`@keyframes`) التي يكشفها هذا المكون.

---

### layers

> **layers**: `CssLayer`[]

طبقات Cascade (`@layer`) التي يشارك فيها هذا المكون.

---

### conditions

> **conditions**: `CssCondition`[]

كتل الدعم الشرطي (`@container`/`@supports`/`@media`) التي تقع القواعد تحتها.

---

### examples

> **examples**: `string`[]

كتل `@example`، حرفياً.

---

### structure?

> `optional` **structure?**: `StructureNode`[]

شجرة العنصر `@structure` المأليفة (العقد من المستوى الأعلى)، عند وجودها. عندما يستخدم جسم `@structure`
كتل `@variant` (انظر [structureVariants](#structurevariants))، يحتفظ هذا بعقد النوع الأول فقط،
للتوافق للخلف مع أي رمز لم يتم تحديثه لقراءة `structureVariants`.

---

### structureVariants?

> `optional` **structureVariants?**: `StructureVariant`[]

أشكال DOM بديلة لهذا المكون، عندما يحتوي جسم `@structure` المأليف على واحد أو
أكثر من كتل `@variant` من المستوى الأعلى — غائب بالنسبة للحالة الشائعة من هيكل واحد غير متغير.

---

### structureDescription?

> `optional` **structureDescription?**: `string`

وصف نثر اختياري يقود جسم `@structure`، عند تأليفه.

---

### demo?

> `optional` **demo?**: `string`

`@demo &lt;spec&gt;` (على سبيل المثال `self:button`)، عند تأليفه.

---

### deprecated?

> `optional` **deprecated?**: `string`

نص استبدال الإهمال على مستوى المكون، عند تأليفه (الحجة لعلامة `@deprecated`).

---

### see

> **see**: `string`[]

المراجع المتقاطعة `@see &lt;ref&gt;`.

---

### usage?

> `optional` **usage?**: `string`

نثر الاستخدام من `@usage` — كيفية تضمين ورقة الأنماط / استخدام المكون.

---

### annotations

> **annotations**: `CssAnnotation`[]

صفوف وسيلة إيضاح التعليقات المحلية من `@annotations`، بترتيب المؤلف.

---

### refs

> **refs**: `number`[]

المراجع المحلية للتعليقات من `@ref`، بترتيب المؤلف.

---

### decorators

> **decorators**: `CssDecorator`[]

مزخرفات نموذج الكائنات على مستوى السجل.

---

### compat

> **compat**: `string`[]

ملاحظات الدعم للمتصفح / توافق الميزات من `@compat`.

---

### related

> **related**: `CssRelated`[]

مكونات ذات صلة من `@related`.

---

### memberOf?

> `optional` **memberOf?**: `CssMemberOf`

عضوية العائلة المُعلنة من `@memberOf` — هذا السجل هو عضو في سجل مسمى آخر،
بشكل اختياري `private` (يجب أن يظهر فقط داخل ذلك الوالد). غائب عند عدم التأليف.

---

### members?

> `optional` **members?**: `string`[]

أسماء سجلات الأعضاء من `@members` — الاتجاه العكسي، المُعلن على الوالد.

---

### memberDeclarations?

> `optional` **memberDeclarations?**: `CssMemberDeclaration`[]

إعلانات أعضاء من جانب الوالد المُنظمة من علامات `@member` المتكررة.

---

### source?

> `optional` **source?**: `CssSource`

حيث تم تأليف السجل، عند توفر معلومات الموضع (للروابط المصدرية).

---

### customBlocks?

> `optional` **customBlocks?**: `Record`\<`string`, `string`[]\>

محتوى علامات مخصصة مسجلة (كتلة)، مفهرسة حسب اسم العلامة بدون `@`. تم ملؤها فقط لـ
العلامات المضافة عبر التكوين؛ يتم تجاهل العلامات المجهولة غير المسجلة. غائبة عند عدم العثور على أي منها.
