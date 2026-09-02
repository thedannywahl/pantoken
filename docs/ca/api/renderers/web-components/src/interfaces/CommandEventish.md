[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / CommandEventish

# Interfície: CommandEventish

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La forma `command`/`source` d'un `CommandEvent` d'Invoker Commands (no encara en tipus de biblioteca DOM).

## S'estén

- `Event`

## Propietats

### command

> **command**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

***

### source

> **source**: `Element` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

***

### bubbles

> `readonly` **bubbles**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat de només lectura **`bubbles`** de la interfície Event indica si l'event es propaga cap amunt a través de l'arbre DOM o no.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)

#### Heredat de

`Event.bubbles`

***

### ~~cancelBubble~~

> **cancelBubble**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat **`cancelBubble`** de la interfície Event és deprecada. Utilitza Event.stopPropagation() en lloc seu. Establir el seu valor a cert abans de tornar d'un controlador d'events evita la propagació de l'event. En implementacions posteriors, establir això a fals no fa res. Consulta la compatibilitat del navegador per a més detalls.

#### Deprecat

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)

#### Heredat de

`Event.cancelBubble`

***

### cancelable

> `readonly` **cancelable**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat de només lectura **`cancelable`** de la interfície Event indica si l'event pot ser cancel·lat, i per tant previngut com si mai hagués succeït.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)

#### Heredat de

`Event.cancelable`

***

### composed

> `readonly` **composed**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat de només lectura **`composed`** de la interfície Event retorna un valor booleà que indica si l'event es propagarà a través del límit del shadow DOM al DOM estàndard o no.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)

#### Heredat de

`Event.composed`

***

### currentTarget

> `readonly` **currentTarget**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat de només lectura **`currentTarget`** de la interfície Event identifica l'element al qual s'ha adjuntat el controlador d'events.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)

#### Heredat de

`CommandEventish`.[`currentTarget`](#currenttarget)

***

### defaultPrevented

> `readonly` **defaultPrevented**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat de només lectura **`defaultPrevented`** de la interfície Event retorna un valor booleà que indica si la crida a Event.preventDefault() ha cancel·lat l'event o no.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)

#### Heredat de

`Event.defaultPrevented`

***

### eventPhase

> `readonly` **eventPhase**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat de només lectura **`eventPhase`** de la interfície Event indica quina fase del flux d'events s'està avaluant actualment.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)

#### Heredat de

`Event.eventPhase`

***

### isTrusted

> `readonly` **isTrusted**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat de només lectura **`isTrusted`** de la interfície Event és un valor booleà que és cert quan l'event va ser generat per l'agent d'usuari (inclòs via accions d'usuari i mètodes programàtics com HTMLElement.focus()), i fals quan l'event va ser enviat via EventTarget.dispatchEvent(). L'única excepció és l'event de clic, que inicialitza la propietat isTrusted a fals en agents d'usuari.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)

#### Heredat de

`Event.isTrusted`

***

### ~~returnValue~~

> **returnValue**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat Event **`returnValue`** indica si l'acció per defecte d'aquest event ha estat previnguda o no.

#### Deprecat

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)

#### Heredat de

`Event.returnValue`

***

### ~~srcElement~~

> `readonly` **srcElement**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

El **`Event.srcElement`** deprecat és un àlies per a la propietat Event.target. Utilitzeu Event.target en canvi.

#### Deprecat

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)

#### Heredat de

`CommandEventish`.[`srcElement`](#srcelement)

***

### target

> `readonly` **target**: `EventTarget` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat **`target`** de només lectura de la interfície Event és una referència a l'objecte sobre el qual es va enviar l'event. És diferent de Event.currentTarget quan el controlador d'events es crida durant la fase de bubbling o captura de l'event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)

#### Heredat de

`CommandEventish`.[`target`](#target)

***

### timeStamp

> `readonly` **timeStamp**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat **`timeStamp`** de només lectura de la interfície Event retorna l'hora (en mil·lisegons) en què es va crear l'event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)

#### Heredat de

`Event.timeStamp`

***

### type

> `readonly` **type**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

La propietat **`type`** de només lectura de la interfície Event retorna una cadena que conté el tipus de l'event. Es defineix quan es construeix l'event i és el nom comunament utilitzat per referir-se a l'event específic, com ara click, load o error.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)

#### Heredat de

`Event.type`

***

### NONE

> `readonly` **NONE**: `0`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

#### Heredat de

`Event.NONE`

***

### CAPTURING\_PHASE

> `readonly` **CAPTURING\_PHASE**: `1`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

#### Heredat de

`Event.CAPTURING_PHASE`

***

### AT\_TARGET

> `readonly` **AT\_TARGET**: `2`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

#### Heredat de

`Event.AT_TARGET`

***

### BUBBLING\_PHASE

> `readonly` **BUBBLING\_PHASE**: `3`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

#### Heredat de

`Event.BUBBLING_PHASE`

## Mètodes

### composedPath()

> **composedPath**(): `EventTarget`[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

El mètode **`composedPath()`** de la interfície Event retorna la ruta de l'event que és una matriu dels objectes sobre els quals es cridaran els listeners. Això no inclou nodes en arbres d'ombra si l'arrel d'ombra es va crear amb el seu ShadowRoot.mode tancat.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)

#### Retorna

`EventTarget`[]

#### Heredat de

`Event.composedPath`

***

### ~~initEvent()~~

> **initEvent**(`type`, `bubbles?`, `cancelable?`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

El mètode **`Event.initEvent()`** s'utilitza per inicialitzar el valor d'un event creat amb Document.createEvent().

#### Paràmetres

##### type

`string`

##### bubbles?

`boolean`

##### cancelable?

`boolean`

#### Retorna

`void`

#### Deprecat

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/initEvent)

#### Heredat de

`Event.initEvent`

***

### preventDefault()

> **preventDefault**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

El mètode **`preventDefault()`** de la interfície Event indica a l'agent d'usuari que l'event s'està tractant explícitament, de manera que no s'hauria de dur a terme la seva acció per defecte, com ara el desplaçament de pàgina, la navegació de vincles o l'enganxament de text.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)

#### Retorna

`void`

#### Heredat de

`Event.preventDefault`

***

### stopImmediatePropagation()

> **stopImmediatePropagation**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

El mètode **`stopImmediatePropagation()`** de la interfície Event evita que es cridin altres listeners del mateix event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)

#### Retorna

`void`

#### Heredat de

`Event.stopImmediatePropagation`

***

### stopPropagation()

> **stopPropagation**(): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

El mètode **`stopPropagation()`** de la interfície Event impedeix la propagació addicional de l'event actual en les fases de captura i bubbling. Tanmateix, no evita que es produeixi cap comportament per defecte; per exemple, els clics a les enllaços es processaran. Si voleu detenir aquests comportaments, consulteu el mètode preventDefault(). Tampoc no evita la propagació a altres controladors d'events de l'element actual. Si voleu detenir-ho, consulteu stopImmediatePropagation().

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)

#### Retorna

`void`

#### Heredat de

`Event.stopPropagation`
