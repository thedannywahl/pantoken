[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / CommandEventish

# Interface: CommandEventish

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

شكل `command`/`source` لأوامر المستدعي `CommandEvent` (غير موجود بعد في أنواع مكتبة DOM).

## Extends

- `Event`

## Properties

### command

> **command**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

---

### source

> **source**: `Element` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

---

### bubbles

> `readonly` **bubbles**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

تشير خاصية **`bubbles`** للقراءة فقط من واجهة Event إلى ما إذا كان الحدث يفقاعة عبر شجرة DOM أم لا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)

#### Inherited from

`Event.bubbles`

---

### ~~cancelBubble~~

> **cancelBubble**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

خاصية **`cancelBubble`** من واجهة Event مهجورة. استخدم Event.stopPropagation() بدلاً من ذلك. يمنع تعيين قيمتها على true قبل العودة من معالج الحدث انتشار الحدث. في التطبيقات اللاحقة، لا يفعل تعيين هذا على false شيئًا. اطلع على Browser compatibility للتفاصيل.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)

#### Inherited from

`Event.cancelBubble`

---

### cancelable

> `readonly` **cancelable**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

تشير خاصية **`cancelable`** للقراءة فقط من واجهة Event إلى ما إذا كان يمكن إلغاء الحدث، وبالتالي منعه كما لو لم يحدث الحدث أبدًا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)

#### Inherited from

`Event.cancelable`

---

### composed

> `readonly` **composed**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

تعيد خاصية **`composed`** للقراءة فقط من واجهة Event قيمة منطقية تشير إلى ما إذا كان الحدث سينتشر عبر حد shadow DOM إلى DOM القياسي أم لا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)

#### Inherited from

`Event.composed`

---

### currentTarget

> `readonly` **currentTarget**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

تحدد خاصية **`currentTarget`** للقراءة فقط من واجهة Event العنصر الذي تم إرفاق معالج الحدث به.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)

#### Inherited from

`CommandEventish`.[`currentTarget`](#currenttarget)

---

### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

تعيد خاصية **`defaultPrevented`** للقراءة فقط من واجهة Event قيمة منطقية تشير إلى ما إذا كان الاتصال بـ Event.preventDefault() قد ألغى الحدث أم لا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)

#### Inherited from

`Event.defaultPrevented`

---

### eventPhase

> `readonly` **eventPhase**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

تشير خاصية **`eventPhase`** للقراءة فقط من واجهة Event إلى أي مرحلة من مراحل تدفق الحدث يتم تقييمها حاليًا.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)

#### Inherited from

`Event.eventPhase`

---

### isTrusted

> `readonly` **isTrusted**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

خاصية **`isTrusted`** للقراءة فقط من واجهة Event هي قيمة منطقية تكون true عندما يتم إنشاء الحدث بواسطة وكيل المستخدم (بما في ذلك من خلال إجراءات المستخدم والطرق البرمجية مثل HTMLElement.focus())، و false عندما يتم توزيع الحدث عبر EventTarget.dispatchEvent(). الاستثناء الوحيد هو حدث النقر، الذي يهيئ خاصية isTrusted على false في وكلاء المستخدم.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)

#### Inherited from

`Event.isTrusted`

---

### ~~returnValue~~

> **returnValue**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

خاصية الحدث **`returnValue`** تشير إلى ما إذا كان تم منع الإجراء الافتراضي لهذا الحدث أم لا.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)

#### Inherited from

`Event.returnValue`

---

### ~~srcElement~~

> `readonly` **srcElement**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

الخاصية المهجورة **`Event.srcElement`** هي بديل لخاصية Event.target. استخدم Event.target بدلاً منها.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)

#### Inherited from

`CommandEventish`.[`srcElement`](#srcelement)

---

### target

> `readonly` **target**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

خاصية **`target`** للقراءة فقط من واجهة الحدث هي مرجع للكائن الذي تم إرسال الحدث إليه. وهي مختلفة عن Event.currentTarget عندما يتم استدعاء معالج الحدث أثناء مرحلة البثّ أو الالتقاط للحدث.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)

#### Inherited from

`CommandEventish`.[`target`](#target)

---

### timeStamp

> `readonly` **timeStamp**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

خاصية **`timeStamp`** للقراءة فقط من واجهة الحدث تُرجع الوقت (بالميلي ثانية) الذي تم إنشاء الحدث فيه.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)

#### Inherited from

`Event.timeStamp`

---

### type

> `readonly` **type**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

خاصية **`type`** للقراءة فقط من واجهة الحدث تُرجع سلسلة نصية تحتوي على نوع الحدث. يتم تعيينها عند إنشاء الحدث وهي الاسم المستخدم عادةً للإشارة إلى حدث معين، مثل click أو load أو error.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)

#### Inherited from

`Event.type`

---

### NONE

> `readonly` **NONE**: `0`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

#### Inherited from

`Event.NONE`

---

### CAPTURING\_PHASE

> `readonly` **CAPTURING\_PHASE**: `1`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

#### Inherited from

`Event.CAPTURING_PHASE`

---

### AT\_TARGET

> `readonly` **AT\_TARGET**: `2`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

#### Inherited from

`Event.AT_TARGET`

---

### BUBBLING\_PHASE

> `readonly` **BUBBLING\_PHASE**: `3`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

#### Inherited from

`Event.BUBBLING_PHASE`

## Methods

### composedPath()

> **composedPath**(): `EventTarget`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

طريقة **`composedPath()`** من واجهة الحدث تُرجع مسار الحدث وهي مصفوفة من الكائنات التي سيتم استدعاء المستمعين عليها. وهذا لا يشمل العُقد في الأشجار المخفية إذا تم إنشاء جذر الظل مع ShadowRoot.mode مغلق.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)

#### Returns

`EventTarget`[]

#### Inherited from

`Event.composedPath`

---

### ~~initEvent()~~

> **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

تُستخدم طريقة **`Event.initEvent()`** لتهيئة قيمة حدث تم إنشاؤه باستخدام Document.createEvent().

#### Parameters

##### type

`string`

##### bubbles?

`boolean`

##### cancelable?

`boolean`

#### Returns

`void`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/initEvent)

#### Inherited from

`Event.initEvent`

---

### preventDefault()

> **preventDefault**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

طريقة **`preventDefault()`** من واجهة الحدث تخبر وكيل المستخدم أن الحدث يتم التعامل معه بشكل صريح، لذلك لا يجب تنفيذ إجراؤه الافتراضي، مثل التمرير على الصفحة أو التنقل بين الروابط أو لصق النص.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)

#### Returns

`void`

#### Inherited from

`Event.preventDefault`

---

### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

طريقة **`stopImmediatePropagation()`** من واجهة الحدث تمنع استدعاء مستمعين آخرين لنفس الحدث.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)

#### Returns

`void`

#### Inherited from

`Event.stopImmediatePropagation`

---

### stopPropagation()

> **stopPropagation**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

طريقة **`stopPropagation()`** من واجهة الحدث تمنع المزيد من انتشار الحدث الحالي في مراحل الالتقاط والبثّ. ومع ذلك، فإنها لا تمنع حدوث أي سلوكيات افتراضية؛ على سبيل المثال، لا تزال النقرات على الروابط معالجة. إذا كنت تريد إيقاف هذه السلوكيات، راجع طريقة preventDefault(). كما أنها لا تمنع الانتشار إلى معالجات أحداث أخرى للعنصر الحالي. إذا كنت تريد إيقاف تلك، راجع stopImmediatePropagation().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)

#### Returns

`void`

#### Inherited from

`Event.stopPropagation`
