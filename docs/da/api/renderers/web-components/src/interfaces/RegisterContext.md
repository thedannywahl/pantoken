[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / RegisterContext

# Interface: RegisterContext

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Den delte tilstand, som et `register()`-kald bygger én gang og tråder til hver [ElementDefinition](ElementDefinition.md). Den indeholder adapteret præfiks-bevidst register, hjælperen `tag()` til indlejret markup, CSS-klassepræfikset `I`, Invoker Commands-understøttelsesflag + router, fabrikker for `wrapper`/`variantClass`/`iconSvg`, og lokalitetsdata (`strings`, `locale`, `dir`, `firstDay`).

## Egenskaber

### registry

> **registry**: [`ElementRegistry`](ElementRegistry.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Det scoped register: omskriver `instui-&lt;base&gt;` → aktivt-præfiks-tag på `get`/`define`.

***

### tag

> **tag**: (`base`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Kortlæg et basisnavn til aktivt-præfiks-tag (til indlejret markup, `querySelector`, `tagName`).

#### Parametre

##### base

`string`

#### Returnerer

`string`

***

### I

> **I**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

CSS-klassepræfikset til de inline komponenter — altid `instui`, adskilt fra tag-præfikset.

#### prefix

> `readonly` **prefix**: `"instui"`

***

### invokerSupported

> **invokerSupported**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Om browseren understøtter Invoker Commands API (`command`/`commandfor`).

***

### onCommand

> **onCommand**: `OnCommand`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Rute et mål's `command`-begivenheder (eller et klik-fallback) til en handler.

***

### wrapper

> **wrapper**: (`tag`, `css`, `render`, `options?`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Definer et shadow-DOM-element: `&lt;style&gt;:host{display}css&lt;/style&gt;` + markup fra `render(host)`.
`invoker: true` videresender værten's `popovertarget`/`command` til det indre `&lt;button&gt;` (IDL).

#### Parametre

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

#### Returnerer

`void`

***

### variantClass

> **variantClass**: (`name`, `host`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Byg en `.instui-&lt;name&gt;`-klasse med en valgfri `-color-&lt;variant&gt;`-modifikator fra `variant`.

#### Parametre

##### name

`string`

##### host

`HTMLElement`

#### Returnerer

`string`

***

### iconSvg

> **iconSvg**: (`name`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Løs et ikonnavn til inline SVG (tom streng når ukendt).

#### Parametre

##### name

`string`

#### Returnerer

`string`

***

### locale

> **locale**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

BCP47 lokalitetsmærke brugt til `toLocaleDateString` og `Intl` formatering.

***

### dir

> **dir**: `"ltr"` \| `"rtl"`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Tekstretning afledt fra det aktive lokalitetsbundle.

***

### firstDay

> **firstDay**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Første dag i ugen som JS `Date.getDay()` indeks (0=Søndag … 6=Lørdag).

***

### strings

> **strings**: [`WebComponentStrings`](WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Oversatte UI-strenge til alle adfærdselementer.
