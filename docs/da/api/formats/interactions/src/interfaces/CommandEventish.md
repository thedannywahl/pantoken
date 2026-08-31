[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / CommandEventish

# Interface: CommandEventish

Formen på `command`/`source` for en Invoker Commands `CommandEvent` (endnu ikke i DOM lib-typer).

## Extends

- `Event`

## Properties

### command

> **command**: `string`

---

### source

> **source**: `Element` \| `null`

---

### bubbles

> `readonly` **bubbles**: `boolean`

Egenskaben **`bubbles`** der kun kan læses af Event-grænsefladen angiver, om begivenheden bobler op gennem DOM-træet eller ej.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)

#### Inherited from

`Event.bubbles`

---

### ~~cancelBubble~~

> **cancelBubble**: `boolean`

Egenskaben **`cancelBubble`** af Event-grænsefladen er forældet. Brug Event.stopPropagation() i stedet. Hvis du indstiller dens værdi til true før du vender tilbage fra en event-handler, forhindrer det begivenhedens udbredelse. I senere implementeringer har det ingen effekt at indstille dette til false. Se Browser-kompatibilitet for detaljer.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)

#### Inherited from

`Event.cancelBubble`

---

### cancelable

> `readonly` **cancelable**: `boolean`

Egenskaben **`cancelable`** der kun kan læses af Event-grænsefladen angiver, om begivenheden kan annulleres, og således forhindres som om den aldrig skete.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)

#### Inherited from

`Event.cancelable`

---

### composed

> `readonly` **composed**: `boolean`

Den **`composed`** egenskab der kun kan læses af Event-grænsefladen returnerer en boolesk værdi som angiver, om begivenheden vil propagere på tværs af shadow DOM-grænsen til standard DOM.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)

#### Inherited from

`Event.composed`

---

### currentTarget

> `readonly` **currentTarget**: `EventTarget` \| `null`

Egenskaben **`currentTarget`** der kun kan læses af Event-grænsefladen identificerer det element, som event-handleren er knyttet til.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)

#### Inherited from

[`CommandEventish`](../../../../renderers/web-components/src/interfaces/CommandEventish.md).[`currentTarget`](../../../../renderers/web-components/src/interfaces/CommandEventish.md#currenttarget)

---

### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

Egenskaben **`defaultPrevented`** der kun kan læses af Event-grænsefladen returnerer en boolesk værdi som angiver, om kaldet til Event.preventDefault() annullerede begivenheden.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)

#### Inherited from

`Event.defaultPrevented`

---

### eventPhase

> `readonly` **eventPhase**: `number`

Egenskaben **`eventPhase`** der kun kan læses af Event-grænsefladen angiver, hvilken fase af begivenhedsflowet der aktuelt bliver evalueret.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)

#### Inherited from

`Event.eventPhase`

---

### isTrusted

> `readonly` **isTrusted**: `boolean`

Egenskaben **`isTrusted`** der kun kan læses af Event-grænsefladen er en boolesk værdi som er sand, når begivenheden blev genereret af brugeragenten (herunder via brugerhandlinger og programmatiske metoder såsom HTMLElement.focus()), og falsk, når begivenheden blev afsendt via EventTarget.dispatchEvent(). Den eneste undtagelse er click-begivenheden, som initialiserer isTrusted-egenskaben til false i brugeragenter.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)

#### Inherited from

`Event.isTrusted`

---

### ~~returnValue~~

> **returnValue**: `boolean`

Event-egenskaben **`returnValue`** angiver, om standardhandlingen for denne begivenhed er blevet forhindret eller ej.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)

#### Inherited from

`Event.returnValue`

---

### ~~srcElement~~

> `readonly` **srcElement**: `EventTarget` \| `null`

Den forældede **`Event.srcElement`** er et alias for Event.target-egenskaben. Brug Event.target i stedet.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)

#### Inherited from

[`CommandEventish`](../../../../renderers/web-components/src/interfaces/CommandEventish.md).[`srcElement`](../../../../renderers/web-components/src/interfaces/CommandEventish.md#srcelement)

---

### target

> `readonly` **target**: `EventTarget` \| `null`

Den skrivebeskyttede **`target`**-egenskab for Event-grænsefladen er en reference til det objekt, hvorpå begivenheden blev sendt. Den er forskellig fra Event.currentTarget, når event-handleren kaldes under bubbling- eller capturing-fasen af begivenheden.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)

#### Inherited from

[`CommandEventish`](../../../../renderers/web-components/src/interfaces/CommandEventish.md).[`target`](../../../../renderers/web-components/src/interfaces/CommandEventish.md#target)

---

### timeStamp

> `readonly` **timeStamp**: `number`

Den **`timeStamp`** skrivebeskyttede egenskab for Event-grænsefladen returnerer det tidspunkt (i millisekunder), hvor begivenheden blev oprettet.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)

#### Inherited from

`Event.timeStamp`

---

### type

> `readonly` **type**: `string`

Den **`type`** skrivebeskyttede egenskab for Event-grænsefladen returnerer en streng indeholdende begivenhedens type. Den angives, når begivenheden konstrueres, og er det navn, der almindeligvis bruges til at referere til den specifikke begivenhed, såsom click, load eller error.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)

#### Inherited from

`Event.type`

---

### NONE

> `readonly` **NONE**: `0`

#### Inherited from

`Event.NONE`

---

### CAPTURING\_PHASE

> `readonly` **CAPTURING\_PHASE**: `1`

#### Inherited from

`Event.CAPTURING_PHASE`

---

### AT\_TARGET

> `readonly` **AT\_TARGET**: `2`

#### Inherited from

`Event.AT_TARGET`

---

### BUBBLING\_PHASE

> `readonly` **BUBBLING\_PHASE**: `3`

#### Inherited from

`Event.BUBBLING_PHASE`

## Methods

### composedPath()

> **composedPath**(): `EventTarget`[]

Metoden **`composedPath()`** for Event-grænsefladen returnerer begivenhedens sti, som er en matrix af de objekter, som lyttere vil blive påkaldt på. Dette inkluderer ikke noder i skyggetræer, hvis skyggeroden blev oprettet med dens ShadowRoot.mode lukket.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)

#### Returns

`EventTarget`[]

#### Inherited from

`Event.composedPath`

---

### ~~initEvent()~~

> **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

Metoden **`Event.initEvent()`** bruges til at initialisere værdien af en begivenhed oprettet ved hjælp af Document.createEvent().

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

Metoden **`preventDefault()`** for Event-grænsefladen fortæller brugeragenten, at begivenheden bliver håndteret eksplicit, så dens standardhandling, såsom sidescrolling, linknavigation eller indsætning af tekst, ikke skal foretages.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)

#### Returns

`void`

#### Inherited from

`Event.preventDefault`

---

### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

Metoden **`stopImmediatePropagation()`** for Event-grænsefladen forhindrer andre lyttere af den samme begivenhed i at blive kaldt.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)

#### Returns

`void`

#### Inherited from

`Event.stopImmediatePropagation`

---

### stopPropagation()

> **stopPropagation**(): `void`

Metoden **`stopPropagation()`** for Event-grænsefladen forhindrer yderligere udbredelse af den aktuelle begivenhed i capturing- og bubbling-faserne. Den forhindrer dog ikke eventuelle standardadfærd i at forekomme; for eksempel behandles klik på links stadig. Hvis du vil stoppe denne adfærd, se metoden preventDefault(). Den forhindrer heller ikke udbredelse til andre event-handlere for det aktuelle element. Hvis du vil stoppe det, se stopImmediatePropagation().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)

#### Returns

`void`

#### Inherited from

`Event.stopPropagation`
