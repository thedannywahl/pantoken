[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / CommandEventish

# Interface: CommandEventish

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Invoker Commands `CommandEvent`-ի `command`/`source` ձևը (դեռ DOM lib տեսակներում չկա):

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

Event ինտերֆեյսի **`bubbles`** միայն կարդացվող հատկությունը ցույց է տալիս, թե արդյոք իրադարձությունը բարձրանում է DOM ծառի միջով կամ ոչ:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)

#### Inherited from

`Event.bubbles`

---

### ~~cancelBubble~~

> **cancelBubble**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի **`cancelBubble`** հատկությունը հեռացել է: Օգտագործեք Event.stopPropagation() դրա փոխարեն: Դրա արժեքը true-ի կարգավորումը իրադարձության մշակիչից վերադառնալուց առաջ կանխում է իրադարձության տարածումը: Ավելի ուշ իրականացումներում դա false-ի կարգավորումը ոչինչ չի անում: Մանրամասների համար տես Browser համատեղելիություն:

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)

#### Inherited from

`Event.cancelBubble`

---

### cancelable

> `readonly` **cancelable**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի **`cancelable`** միայն կարդացվող հատկությունը ցույց է տալիս, թե արդյոք իրադարձությունը կարող է չեղարկվել, և հետևաբար կանխվել այնպես, կարծես իրադարձություն երբեք չի տեղի ունեցել:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)

#### Inherited from

`Event.cancelable`

---

### composed

> `readonly` **composed**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի միայն կարդացվող **`composed`** հատկությունը վերադարձնում է բուլյան արժեք, որը ցույց է տալիս, թե արդյոք իրադարձությունը կտարածվի shadow DOM սահմանի միջով ստանդարտ DOM-ի մեջ:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)

#### Inherited from

`Event.composed`

---

### currentTarget

> `readonly` **currentTarget**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի **`currentTarget`** միայն կարդացվող հատկությունը որոշում է տարրը, որին կցված է իրադարձության մշակիչ:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)

#### Inherited from

`CommandEventish`.[`currentTarget`](#currenttarget)

---

### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի **`defaultPrevented`** միայն կարդացվող հատկությունը վերադարձնում է բուլյան արժեք, որը ցույց է տալիս, թե արդյոք Event.preventDefault() կանչը չեղարկել է իրադարձությունը:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)

#### Inherited from

`Event.defaultPrevented`

---

### eventPhase

> `readonly` **eventPhase**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի **`eventPhase`** միայն կարդացվող հատկությունը ցույց է տալիս, թե իրադարձության հոսքի որ փուլը ներկայումս գնահատվում է:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)

#### Inherited from

`Event.eventPhase`

---

### isTrusted

> `readonly` **isTrusted**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի **`isTrusted`** միայն կարդացվող հատկությունը բուլյան արժեք է, որը true է, երբ իրադարձությունը գոյացել է օգտատիրոջ գործակալից (ներառյալ օգտատիրոջ գործողությունների և ծրագրային մեթոդների միջոցով, ինչպես HTMLElement.focus()), և false, երբ իրադարձությունը ուղղարկվել է EventTarget.dispatchEvent()-ի միջոցով: Միակ բացառությունը click իրադարձությունն է, որը isTrusted հատկությունը false-ի վրա նախաձեռնում է օգտատիրոջ գործակալներում:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)

#### Inherited from

`Event.isTrusted`

---

### ~~returnValue~~

> **returnValue**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event հատկությունը **`returnValue`** ցույց է տալիս թե արդյոք այս իրադարձության լռելյալ գործողությունը կանխվել է կամ ոչ:

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)

#### Inherited from

`Event.returnValue`

---

### ~~srcElement~~

> `readonly` **srcElement**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Հարմարվածի **`Event.srcElement`** մի կեղծանուն է Event.target հատկության համար: Փոխարենը օգտագործեք Event.target:

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)

#### Inherited from

`CommandEventish`.[`srcElement`](#srcelement)

---

### target

> `readonly` **target**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի միայն կարդացվող **`target`** հատկությունը հղում է այն օբյեկտին, որի վրա իրադարձությունը ուղարկվել է: Այն տարբերվում է Event.currentTarget-ից, երբ իրադարձության մշակիչը կոչվում է իրադարձության պղպջակային կամ գրավման փուլում:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)

#### Inherited from

`CommandEventish`.[`target`](#target)

---

### timeStamp

> `readonly` **timeStamp**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի **`timeStamp`** միայն կարդացվող հատկությունը վերադարձնում է ժամանակը (միլիվայրկյաններով), երբ իրադարձությունը ստեղծվել է:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)

#### Inherited from

`Event.timeStamp`

---

### type

> `readonly` **type**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի **`type`** միայն կարդացվող հատկությունը վերադարձնում է հաղորդագիր, որը պարունակում է իրադարձության տեսակը: Այն սահմանվում է, երբ իրադարձությունը կառուցվում է և այն անվանումն է, որը սովորաբար օգտագործվում է կոնկրետ իրադարձության վերաբերմամբ խոսելու համար, ինչպես click, load կամ error:

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

Event ինտերֆեյսի **`composedPath()`** մեթոդը վերադարձնում է իրադարձության ուղին, որը օբյեկտների զանգված է, որոնց վրա ունկներ կմեկնարկեն: Սա չի ներառում shadow trees-ի հանգույցները, եթե shadow root-ը ստեղծվել է իր ShadowRoot.mode closed-ով:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)

#### Returns

`EventTarget`[]

#### Inherited from

`Event.composedPath`

---

### ~~initEvent()~~

> **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

**`Event.initEvent()`** մեթոդը օգտագործվում է Document.createEvent()-ի միջոցով ստեղծված իրադարձության արժեքը սկզբնավորելու համար:

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

Event ինտերֆեյսի **`preventDefault()`** մեթոդը ասում է օգտատիրոջ միջոցին, որ իրադարձությունը հստակորեն մշակվում է, ուստի դրա լռելյալ գործողությունը, ինչպես էջի մեծացումը, հղումի նավարկումը կամ տեքստը տեղադրելը, չպետք է կատարվի:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)

#### Returns

`void`

#### Inherited from

`Event.preventDefault`

---

### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի **`stopImmediatePropagation()`** մեթոդը կանխում է նույն իրադարձության այլ ունկներ կոչվելուց:

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)

#### Returns

`void`

#### Inherited from

`Event.stopImmediatePropagation`

---

### stopPropagation()

> **stopPropagation**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Event ինտերֆեյսի **`stopPropagation()`** մեթոդը կանխում է ընթացիկ իրադարձության հետագա տարածումը գրավման և պղպջակային փուլերում: Այն, սակայն, չի կանխում լռելյալ վարքի առաջացումը. օրինակ, հղումների վրա սեղմումները դեռ մշակվում են: Եթե ցանկանում եք կանխել այդ վարքը, տես preventDefault() մեթոդը: Այն նաև չի կանխում տարածումը ընթացիկ տարրի այլ իրադարձության մշակիչներին: Եթե ցանկանում եք կանխել դրանք, տես stopImmediatePropagation():

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)

#### Returns

`void`

#### Inherited from

`Event.stopPropagation`
