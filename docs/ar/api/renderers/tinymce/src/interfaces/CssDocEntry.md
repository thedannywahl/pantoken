[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / CssDocEntry

# واجهة: CssDocEntry

سجل CSS موثق واحد: فئته الأساسية وكل ما تم اشتقاقه من CSS + تعليقات التوثيق.

## الخصائص

### name

> **name**: `string`

اسم السجل من `@component`/`@utility`/`@rule`/`@declaration`/`@name`، مثلاً `button`.

***

### kind

> **kind**: `CssRecordKind`

نوع سطح CSS الذي يوثقه هذا (الافتراضي `component`).

***

### className

> **className**: `string`

محدد CSS الأساسي — فئة (`.button`)، سمة (`[data-layout="x"]`)، معرف (`#foo`)،
أو موهوم shadow-DOM (`:host`) — مستنتَج من أول قاعدة بفئة عارية أو مُضبَط صراحةً عبر
`@selector`. دائماً غير فارغ (يرجع إلى `.${name}` عند فشل الاستنتاج).

***

### summary?

> `optional` **summary?**: `string`

ملخص من سطر واحد من `@summary`.

***

### remarks?

> `optional` **remarks?**: `string`

نص مطول من `@remarks`.

***

### privateRemarks?

> `optional` **privateRemarks?**: `string`

نص داخلي فقط من `@privateRemarks` (قد تختار المُصدِّرات عدم تضمينه في المخرجات العامة).

***

### releaseStage?

> `optional` **releaseStage?**: `CssReleaseStage`

مرحلة الإصدار من وسم علم المُعدِّل (`@alpha`/`@beta`/`@experimental`/`@internal`/`@public`).

***

### since?

> `optional` **since?**: `string`

الإصدار الذي أُدخِل فيه، من `@since`.

***

### group?

> `optional` **group?**: `string`

مجموعة/فئة التوثيق، من `@group`/`@category`.

***

### accessibility?

> `optional` **accessibility?**: `string`

إرشادات إمكانية الوصول، من `@a11y`/`@accessibility`.

***

### global?

> `optional` **global?**: `boolean`

يُعيَّن عندما يحمل هذا السجل وسم `@global` — مُعدِّلاته (وعلامات `@global` لكل مُعدِّل)
تنطبق على أي مكوّن/تخطيط/قاعدة/تصريح، وليس فقط على فئة هذا السجل الأساسية. يُستخدم أثناء
التحقق والاستهلاك لحل تطابقات المُعدِّلات على مستوى العالم.

***

### modifiers

> **modifiers**: `CssModifier`[]

المعدِّلات المستخرجة من AST، مشروحة بنص `@modifier` حيث كُتبت.

***

### parts

> **parts**: `CssPart`[]

أجزاء العناصر الفرعية المستخرجة من AST (بناءً على الفئات)، مشروحة بنص `@part` حيث كُتبت.

***

### shadowParts

> **shadowParts**: `CssPart`[]

الأجزاء المكشوفة في Shadow-DOM (`::part(name)`), من `@csspart` أو محدد `::part()`.

***

### pseudoElements

> **pseudoElements**: `CssPseudoElement`[]

الزوايا الوهمية الأصلية التي تُطبَّق على المكوّن (`::before`, `::marker`, …)، من `@pseudo` أو محدد.

***

### states

> **states**: `CssState`[]

الحالات التي يتفاعل معها المكوّن، من `@cssstate`, `:state()`, الصفات الزائفة، أو فئات الحالة.

***

### slots

> **slots**: `CssSlot`[]

المقاطع المسماة التي يكشفها هيكل المكوّن، من `@slot`.

***

### elements?

> `optional` **elements?**: `CssElementConstraints`

عناصر HTML المسموح بها من `@element` (الملف الافتراضي + ملفات تعريف مسماة اختيارية).

***

### todos

> **todos**: `string`[]

ملاحظات مهام داخلية، من وسوم `@todo` وتعليقات سطرية `/* @todo … */`. ملاحظات تطوير،
ليست واجهة عامة — قد تقوم المُصدِّرات بحذفها (مثل [CssDocEntry.privateRemarks](#privateremarks)).

***

### cssPropertiesConsumed

> **cssPropertiesConsumed**: `CssTokenConsumed`[]

رموز التصميم التي يستهلكها هذا المكوّن: كل خاصية مخصصة `--*` مشار إليها عبر `var(...)` داخل
قواعده، موشحة بنص `@tokens` حيث كُتبت (وبضمنها أي رمز مُعلن عبر `@tokens` غير الموجود حرفياً عبر `var()`).

***

### cssPropertiesDeclared

> **cssPropertiesDeclared**: `CssPropertyDeclared`[]

الخصائص المخصصة التي يعلنها هذا المكوّن (`@property`) أو يوثّقها (`@cssproperty`).

***

### functions

> **functions**: `CssFunction`[]

دوال CSS المخصصة (`@function`) التي يعرّفها هذا المكوّن.

***

### animations

> **animations**: `CssAnimation`[]

الحركات (`@keyframes`) التي يكشفها هذا المكوّن.

***

### layers

> **layers**: `CssLayer`[]

طبقات التتابع (`@layer`) التي يشارك فيها هذا المكوّن.

***

### conditions

> **conditions**: `CssCondition`[]

كتل دعم شرطية (`@container`/`@supports`/`@media`) تقع تحتها القواعد.

***

### examples

> **examples**: `string`[]

كتل `@example`، حرفيًّا.

***

### structure?

> `optional` **structure?**: `StructureNode`[]

شجرة عناصر `@structure` المؤلفة من المؤلف (العُقد العلوية)، عندما تكون موجودة. عندما يستخدم جسم `@structure` كتل `@variant` (انظر [structureVariants](#structurevariants))، فهذا يحتوي على عقد المتغيّر الأول فقط،
للحفاظ على التوافق مع أي كود لم يتم تحديثه لقراءة `structureVariants`.

***

### structureVariants?

> `optional` **structureVariants?**: `StructureVariant`[]

أشكال DOM البديلة لهذا المكوّن، عندما يحتوي جسم `@structure` المؤلّف على كتلة أو
أكثر من كتل `@variant` العلوية — غير موجود للحالة الشائعة لبنية واحدة غير متغيرة.

***

### structureDescription?

> `optional` **structureDescription?**: `string`

وصف نصي اختياري يسبق جسم `@structure`، عندما يُكتب.

***

### demo?

> `optional` **demo?**: `string`

`@demo &lt;spec&gt;` (مثال `self:button`), عندما يُكتب.

***

### deprecated?

> `optional` **deprecated?**: `string`

نص استبدال الإهمال على مستوى المكوّن، عندما يُكتب (الوسيط لوسم `@deprecated`).

***

### see

> **see**: `string`[]

المراجع المتقاطعة `@see &lt;ref&gt;`.

***

### usage?

> `optional` **usage?**: `string`

نص الاستخدام من `@usage` — كيفية تضمين ورقة الأنماط / استخدام المكوّن.

***

### annotations

> **annotations**: `CssAnnotation`[]

صفوف أسطورة التعليقات المحلية من `@annotations`، بترتيب المؤلف.

***

### refs

> **refs**: `number`[]

مراجع التعليقات المحلية من `@ref`، بترتيب المؤلف.

***

### decorators

> **decorators**: `CssDecorator`[]

مزخرفات نموذج الكائن على مستوى السجل.

***

### compat

> **compat**: `string`[]

ملاحظات دعم المتصفح / توافق الميزة من `@compat`.

***

### related

> **related**: `CssRelated`[]

المكوّنات ذات الصلة من `@related`.

***

### memberOf?

> `optional` **memberOf?**: `CssMemberOf`

عضوية العائلة المعلنة من `@memberOf` — هذا السجل عضو في سجل مسمّى آخر،
اختياريًا `private` (يجب أن يظهر فقط داخل ذلك الأصل). غائب عندما لا يُكتب.

***

### members?

> `optional` **members?**: `string`[]

أسماء سجلات الأعضاء من `@members` — الاتجاه العكسي، معلَن على الأصل.

***

### memberDeclarations?

> `optional` **memberDeclarations?**: `CssMemberDeclaration`[]

إعلانات الأعضاء المهيكلة على جانب الأصل من وسوم `@member` المكرّرة.

***

### source?

> `optional` **source?**: `CssSource`

مكان تأليف السجل، عندما تتوفر معلومات الموضع (لروابط المصدر).

***

### customBlocks?

> `optional` **customBlocks?**: `Record`\<`string`, `string`[]\>

محتوى الوسوم المخصصة المسجلة (block)، مفهرس باسم الوسم دون الـ`@`. يُملأ فقط للوسوم المضافة عبر التكوين؛ تُتجاهل الوسوم غير المسجلة وغير المعروفة. غائب عندما لا يتم العثور على أيٍ منها.
