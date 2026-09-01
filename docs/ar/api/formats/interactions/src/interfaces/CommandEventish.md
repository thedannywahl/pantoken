[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / CommandEventish

# واجهة: CommandEventish

الهيكل `command`/`source` الخاص بـ Invoker Commands `CommandEvent` (لم يتم تضمينه بعد في أنواع مكتبة DOM).

## يمتد

- `Event`

## الخصائص

### command

> **command**: `string`

***

### source

> **source**: `Element` \| `null`

***

### bubbles

> `readonly` **bubbles**: `boolean`

تُشير الخاصية للقراءة فقط **`bubbles`** في واجهة Event إلى ما إذا كان الحدث يتصاعد عبر شجرة DOM أم لا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)

#### موروث من

`Event.bubbles`

***

### ~~cancelBubble~~

> **cancelBubble**: `boolean`

الخاصية **`cancelBubble`** في واجهة Event مهجورة. استخدم Event.stopPropagation() بدلاً منها. تعيين قيمتها إلى true قبل العودة من معالج الحدث يمنع انتشار الحدث. في تنفيذات لاحقة، تعيينها إلى false لا يفعل شيئًا. راجع التوافق عبر المتصفحات للتفاصيل.

#### مهجور

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)

#### موروث من

`Event.cancelBubble`

***

### cancelable

> `readonly` **cancelable**: `boolean`

تُشير الخاصية القابلة للقراءة فقط **`cancelable`** في واجهة Event إلى ما إذا كان يمكن إلغاء الحدث، وبالتالي منعه كما لو أن الحدث لم يحدث.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)

#### موروث من

`Event.cancelable`

***

### composed

> `readonly` **composed**: `boolean`

الخاصية القابلة للقراءة فقط **`composed`** في واجهة Event تُرجع قيمة منطقية تشير إلى ما إذا كان الحدث سينتشر عبر حد الظل (shadow DOM) إلى DOM القياسي أم لا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)

#### موروث من

`Event.composed`

***

### currentTarget

> `readonly` **currentTarget**: `EventTarget` \| `null`

تُحدد الخاصية القابلة للقراءة فقط **`currentTarget`** في واجهة Event العنصر الذي تم ربط معالج الحدث به.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)

#### موروث من

[`CommandEventish`](../../../../renderers/web-components/src/interfaces/CommandEventish.md).[`currentTarget`](../../../../renderers/web-components/src/interfaces/CommandEventish.md#currenttarget)

***

### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

تُرجع الخاصية القابلة للقراءة فقط **`defaultPrevented`** في واجهة Event قيمة منطقية تشير إلى ما إذا كانت استدعاء Event.preventDefault() قد ألغى الحدث أم لا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)

#### موروث من

`Event.defaultPrevented`

***

### eventPhase

> `readonly` **eventPhase**: `number`

تُشير الخاصية القابلة للقراءة فقط **`eventPhase`** في واجهة Event إلى أي مرحلة من تدفق الحدث يتم تقييمها حاليًا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)

#### موروث من

`Event.eventPhase`

***

### isTrusted

> `readonly` **isTrusted**: `boolean`

الخاصية القابلة للقراءة فقط **`isTrusted`** في واجهة Event قيمة منطقية تكون true عندما يكون الحدث قد تم إنشاؤه بواسطة وكيل المستخدم (بما في ذلك عبر إجراءات المستخدم وطرق برمجية مثل HTMLElement.focus())، وfalse عندما يتم إرسال الحدث عبر EventTarget.dispatchEvent(). الاستثناء الوحيد هو حدث click، الذي يُهيئ الخاصية isTrusted إلى false في وكلاء المستخدم.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)

#### موروث من

`Event.isTrusted`

***

### ~~returnValue~~

> **returnValue**: `boolean`

تُشير الخاصية Event **`returnValue`** إلى ما إذا تم منع الإجراء الافتراضي لهذا الحدث أم لا.

#### مهجور

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)

#### موروث من

`Event.returnValue`

***

### ~~srcElement~~

> `readonly` **srcElement**: `EventTarget` \| `null`

الخاصية المهجورة **`Event.srcElement`** هي اختصار لخاصية Event.target. استخدم Event.target بدلًا منها.

#### مهجور

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)

#### موروث من

[`CommandEventish`](../../../../renderers/web-components/src/interfaces/CommandEventish.md).[`srcElement`](../../../../renderers/web-components/src/interfaces/CommandEventish.md#srcelement)

***

### target

> `readonly` **target**: `EventTarget` \| `null`

الخاصية القابلة للقراءة فقط **`target`** في واجهة Event هي مرجع إلى الكائن الذي تم إرسال الحدث إليه. تختلف عن Event.currentTarget عندما يتم استدعاء معالج الحدث خلال مرحلة الانتشار (bubbling) أو الالتقاط (capturing).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)

#### موروث من

[`CommandEventish`](../../../../renderers/web-components/src/interfaces/CommandEventish.md).[`target`](../../../../renderers/web-components/src/interfaces/CommandEventish.md#target)

***

### timeStamp

> `readonly` **timeStamp**: `number`

تُرجع الخاصية القابلة للقراءة فقط **`timeStamp`** في واجهة Event الوقت (بالملي ثانية) الذي تم إنشاء الحدث فيه.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)

#### موروث من

`Event.timeStamp`

***

### type

> `readonly` **type**: `string`

تُرجع الخاصية القابلة للقراءة فقط **`type`** في واجهة Event سلسلة تحتوي نوع الحدث. يتم تعيينها عند إنشاء الحدث وهي الاسم المستخدم عادةً للإشارة إلى الحدث المحدد، مثل click أو load أو error.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)

#### موروث من

`Event.type`

***

### NONE

> `readonly` **NONE**: `0`

#### موروث من

`Event.NONE`

***

### CAPTURING\_PHASE

> `readonly` **CAPTURING\_PHASE**: `1`

#### موروث من

`Event.CAPTURING_PHASE`

***

### AT\_TARGET

> `readonly` **AT\_TARGET**: `2`

#### موروث من

`Event.AT_TARGET`

***

### BUBBLING\_PHASE

> `readonly` **BUBBLING\_PHASE**: `3`

#### موروث من

`Event.BUBBLING_PHASE`

## الطرق

### composedPath()

> **composedPath**(): `EventTarget`[]

تُرجع طريقة **`composedPath()`** في واجهة Event مسار الحدث، وهو مصفوفة من الكائنات التي سيتم استدعاء المستمعين عليها. هذا لا يشمل العقد داخل أشجار الظل إذا تم إنشاء جذر الظل (shadow root) بوضع ShadowRoot.mode مغلق.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)

#### القيم المرجعة

`EventTarget`[]

#### موروث من

`Event.composedPath`

***

### ~~initEvent()~~

> **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

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

تخبر طريقة **`preventDefault()`** في واجهة Event وكيل المستخدم أن الحدث يتم التعامل معه صراحةً، لذلك يجب ألا تُتخذ أفعالها الافتراضية، مثل تمرير الصفحة أو التنقل بالرابط أو لصق نص.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)

#### القيم المرجعة

`void`

#### موروث من

`Event.preventDefault`

***

### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

تمنع طريقة **`stopImmediatePropagation()`** في واجهة Event استدعاء مستمعي نفس الحدث الآخرين.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)

#### القيم المرجعة

`void`

#### موروث من

`Event.stopImmediatePropagation`

***

### stopPropagation()

> **stopPropagation**(): `void`

تمنع طريقة **`stopPropagation()`** في واجهة Event استمرار انتشار الحدث الحالي في مرحلتي الالتقاط والانتشار. لكنها لا تمنع السلوكيات الافتراضية من الحدوث؛ على سبيل المثال، يتم معالجة النقرات على الروابط. إذا كان الهدف إيقاف تلك السلوكيات، راجع طريقة preventDefault(). كما أنها لا تمنع الانتشار إلى معالجات الأحداث الأخرى على العنصر الحالي. إذا أردت إيقاف ذلك، راجع stopImmediatePropagation().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)

#### القيم المرجعة

`void`

#### موروث من

`Event.stopPropagation`
