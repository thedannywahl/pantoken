[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / CommandEventish

# واجهة: CommandEventish

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

الشكل `command`/`source` لِـ Invoker Commands `CommandEvent` (غير موجود بعد في أنواع مكتبة DOM).

## يمتد

- `Event`

## الخصائص

### command

> **command**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

***

### source

> **source**: `Element` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

***

### bubbles

> `readonly` **bubbles**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُشير الخاصية للقراءة فقط **`bubbles`** في واجهة Event إلى ما إذا كان الحدث يتصاعد عبر شجرة DOM أم لا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)

#### موروث من

`Event.bubbles`

***

### ~~cancelBubble~~

> **cancelBubble**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

الخاصية **`cancelBubble`** في واجهة Event مهجورة. استخدم Event.stopPropagation() بدلًا منها. تعيين قيمتها إلى true قبل العودة من معالج الحدث يمنع انتشار الحدث. في تنفيذات لاحقة، لا يفعل تعيينها إلى false شيئًا. راجع توافق المتصفحات للتفاصيل.

#### مهجور

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)

#### موروث من

`Event.cancelBubble`

***

### cancelable

> `readonly` **cancelable**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُشير الخاصية للقراءة فقط **`cancelable`** في واجهة Event إلى ما إذا كان يمكن إلغاء الحدث، وبالتالي منعه كما لو أن الحدث لم يحدث.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)

#### موروث من

`Event.cancelable`

***

### composed

> `readonly` **composed**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

الخاصية للقراءة فقط **`composed`** في واجهة Event تُرجع قيمة منطقية تشير إلى ما إذا كان الحدث سينتشر عبر حد ظل الظل (shadow DOM) إلى DOM القياسي أم لا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)

#### موروث من

`Event.composed`

***

### currentTarget

> `readonly` **currentTarget**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُحدد الخاصية للقراءة فقط **`currentTarget`** في واجهة Event العنصر الذي تم ربط معالج الحدث به.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)

#### موروث من

`CommandEventish`.[`currentTarget`](#currenttarget)

***

### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُرجع الخاصية للقراءة فقط **`defaultPrevented`** في واجهة Event قيمة منطقية تشير إلى ما إذا كانت استدعاء Event.preventDefault() قد ألغى الحدث أم لا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)

#### موروث من

`Event.defaultPrevented`

***

### eventPhase

> `readonly` **eventPhase**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُشير الخاصية للقراءة فقط **`eventPhase`** في واجهة Event إلى أي مرحلة من تدفق الحدث يتم تقييمها حاليًا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)

#### موروث من

`Event.eventPhase`

***

### isTrusted

> `readonly` **isTrusted**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

الخاصية للقراءة فقط **`isTrusted`** في واجهة Event قيمة منطقية تكون true عندما يتم إنشاء الحدث بواسطة وكيل المستخدم (بما في ذلك عبر إجراءات المستخدم والطرق البرمجية مثل HTMLElement.focus())، وfalse عندما يتم إرسال الحدث عبر EventTarget.dispatchEvent(). الاستثناء الوحيد هو حدث click، الذي يقوم بتهيئة الخاصية isTrusted إلى false في وكلاء المستخدم.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)

#### موروث من

`Event.isTrusted`

***

### ~~returnValue~~

> **returnValue**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُشير الخاصية Event **`returnValue`** إلى ما إذا تم منع الإجراء الافتراضي لهذا الحدث أم لا.

#### مهجور

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)

#### موروث من

`Event.returnValue`

***

### ~~srcElement~~

> `readonly` **srcElement**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

الخاصية المهجورة **`Event.srcElement`** هي مرادف لخاصية Event.target. استخدم Event.target بدلًا منها.

#### مهجور

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)

#### موروث من

`CommandEventish`.[`srcElement`](#srcelement)

***

### target

> `readonly` **target**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

الخاصية للقراءة فقط **`target`** في واجهة Event هي إشارة إلى الكائن الذي تم إرسال الحدث إليه. تختلف عن Event.currentTarget عندما يتم استدعاء معالج الحدث أثناء مرحلة الالتقاط أو الفقاعات.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)

#### موروث من

`CommandEventish`.[`target`](#target)

***

### timeStamp

> `readonly` **timeStamp**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُرجع الخاصية للقراءة فقط **`timeStamp`** في واجهة Event الوقت (بالميلي ثانية) الذي تم فيه إنشاء الحدث.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)

#### موروث من

`Event.timeStamp`

***

### type

> `readonly` **type**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُرجع الخاصية للقراءة فقط **`type`** في واجهة Event سلسلة نصية تحتوي نوع الحدث. يتم تعيينها عند إنشاء الحدث وهي الاسم المستخدم عادة للإشارة إلى الحدث المحدد، مثل click أو load أو error.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)

#### موروث من

`Event.type`

***

### NONE

> `readonly` **NONE**: `0`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

#### موروث من

`Event.NONE`

***

### CAPTURING\_PHASE

> `readonly` **CAPTURING\_PHASE**: `1`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

#### موروث من

`Event.CAPTURING_PHASE`

***

### AT\_TARGET

> `readonly` **AT\_TARGET**: `2`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

#### موروث من

`Event.AT_TARGET`

***

### BUBBLING\_PHASE

> `readonly` **BUBBLING\_PHASE**: `3`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

#### موروث من

`Event.BUBBLING_PHASE`

## الطرق

### composedPath()

> **composedPath**(): `EventTarget`[]

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُرجع طريقة **`composedPath()`** في واجهة Event مسار الحدث، وهو مصفوفة من الكائنات التي سيتم استدعاء المستمعين عليها. هذا لا يشمل العقد داخل أشجار الظل إذا تم إنشاء جذر الظل بوضع ShadowRoot.mode مغلق.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)

#### القيم المرجعة

`EventTarget`[]

#### موروث من

`Event.composedPath`

***

### ~~initEvent()~~

> **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُستخدم الطريقة **`Event.initEvent()`** لتهيئة قيمة حدث تم إنشاؤه باستخدام Document.createEvent().

#### المعلمات

##### type

`string`

##### bubbles?

`boolean`

##### cancelable?

`boolean`

#### القيم المرجعة

`void`

#### مهجور

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/initEvent)

#### موروث من

`Event.initEvent`

***

### preventDefault()

> **preventDefault**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تُعلِم طريقة **`preventDefault()`** في واجهة Event وكيل المستخدم أن الحدث يتم معالجته صراحةً، لذا يجب عدم تنفيذ الإجراء الافتراضي مثل التمرير في الصفحة أو الانتقال إلى رابط أو لصق نص.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)

#### القيم المرجعة

`void`

#### موروث من

`Event.preventDefault`

***

### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تمنع طريقة **`stopImmediatePropagation()`** في واجهة Event استدعاء المستمعين الآخرين لنفس الحدث.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)

#### القيم المرجعة

`void`

#### موروث من

`Event.stopImmediatePropagation`

***

### stopPropagation()

> **stopPropagation**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

تمنع طريقة **`stopPropagation()`** في واجهة Event استمرار انتشار الحدث الحالي في مرحلتي الالتقاط والفقاعات. مع ذلك، فهي لا تمنع السلوكيات الافتراضية من الحدوث؛ على سبيل المثال، تظل نقرات الروابط مُعالجة. إذا أردت إيقاف تلك السلوكيات، انظر إلى طريقة preventDefault(). كما أنها لا تمنع الانتشار إلى معالجات الأحداث الأخرى للعنصر الحالي. إذا أردت إيقافها، انظر إلى stopImmediatePropagation().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)

#### القيم المرجعة

`void`

#### موروث من

`Event.stopPropagation`
