[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / RegisterContext

# Ինտերֆեյս: RegisterContext

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`register()` կանչի կողմից մեկ անգամ կառուցված և յուրաքանչյուր [ElementDefinition](ElementDefinition.md)-ին դեպի թելավորված կիսված վիճակ։ Այն կրում է prefix-գիտակ registry adapter, `tag()` օգնական ներդրված markup-ի համար, CSS-class prefix `I`, Invoker Commands support flag + router, `wrapper`/`variantClass`/`iconSvg` factories, և տեղային տվյալներ (`strings`, `locale`, `dir`, `firstDay`)։

## Առանձնահատկություններ

### registry

> **registry**: [`ElementRegistry`](ElementRegistry.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Scoped registry. վերաշարադրում `instui-&lt;base&gt;` → ակտիվ-prefix tag `get`/`define`-ի վրա։

***

### tag

> **tag**: (`base`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Քարտեզել բազային անունը ակտիվ-prefix tag-ի հետ (ներդրված markup-ի համար, `querySelector`, `tagName`)։

#### Պարամետրեր

##### base

`string`

#### Վերադարձվող արժեք

`string`

***

### I

> **I**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Inlined component sheets-ի համար CSS-class prefix — միշտ `instui`, անջատ tag prefix-ից։

#### prefix

> `readonly` **prefix**: `"instui"`

***

### invokerSupported

> **invokerSupported**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Արդյո՞ք բրաուզերը աջակցում է Invoker Commands API (`command`/`commandfor`):

***

### onCommand

> **onCommand**: `OnCommand`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Մեծնեցել target-ի `command` իրադարձությունները (կամ click fallback) handler-ի դեպ։

***

### wrapper

> **wrapper**: (`tag`, `css`, `render`, `options?`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Սահմանել shadow-DOM տարրը. `&lt;style&gt;:host{display}css&lt;/style&gt;` + markup `render(host)`-ից։ `invoker: true` փոխանցում է host-ի `popovertarget`/`command` inner `&lt;button&gt;`-ին (IDL)։

#### Պարամետրեր

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

#### Վերադարձվող արժեք

`void`

***

### variantClass

> **variantClass**: (`name`, `host`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Կառուցել `.instui-&lt;name&gt;` դաս ընտրովի `-color-&lt;variant&gt;` modifier-ով `variant`-ից։

#### Պարամետրեր

##### name

`string`

##### host

`HTMLElement`

#### Վերադարձվող արժեք

`string`

***

### iconSvg

> **iconSvg**: (`name`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Հաստատել icon անունը inline SVG-ի (դատարկ տող, երբ անհայտ)։

#### Պարամետրեր

##### name

`string`

#### Վերադարձվող արժեք

`string`

***

### locale

> **locale**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

BCP47 locale tag որն օգտագործվում է `toLocaleDateString` և `Intl` ձևավորման համար։

***

### dir

> **dir**: `"ltr"` \| `"rtl"`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Տեքստի ուղղությունը ստացված ակտիվ locale bundle-ից։

***

### firstDay

> **firstDay**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Շաբաթի առաջին օր որպես JS `Date.getDay()` index (0=կիրակի … 6=շաբաթ)։

***

### strings

> **strings**: [`WebComponentStrings`](WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Թարգմանված UI տողեր բոլոր վարքային տարրերի համար։
