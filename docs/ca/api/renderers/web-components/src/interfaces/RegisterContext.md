[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / RegisterContext

# Interface: RegisterContext

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

L'estat compartit que una crida `register()` construeix una vegada i enhebra a cada [ElementDefinition](ElementDefinition.md). Porta l'adaptador del registre conscient del prefix, l'ajudant `tag()` per a marques imbricades, el prefix de la classe CSS `I`, la bandera de suport de comandaments de l'invocador + encaminador, les factories `wrapper`/`variantClass`/`iconSvg`, i dades de configuració regional (`strings`, `locale`, `dir`, `firstDay`).

## Properties

### registry

> **registry**: [`ElementRegistry`](ElementRegistry.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

El registre d'abast: reescriu `instui-&lt;base&gt;` → l'etiqueta de prefix actiu a `get`/`define`.

---

### tag

> **tag**: (`base`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Assigneu un nom de base a l'etiqueta de prefix actiu (per a marques imbricades, `querySelector`, `tagName`).

#### Parameters

##### base

`string`

#### Returns

`string`

---

### I

> **I**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

El prefix de la classe CSS per als fulls de components integrats — sempre `instui`, separat del prefix de l'etiqueta.

#### prefix

> `readonly` **prefix**: `"instui"`

---

### invokerSupported

> **invokerSupported**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Si el navegador admet l'API de comandaments de l'invocador (`command`/`commandfor`).

---

### onCommand

> **onCommand**: `OnCommand`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Encamineu els events `command` d'un objectiu (o una reserva de clic) a un controlador.

---

### wrapper

> **wrapper**: (`tag`, `css`, `render`, `options?`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Definiu un element shadow-DOM: `&lt;style&gt;:host{display}css&lt;/style&gt;` + marques de `render(host)`.
`invoker: true` remet els `popovertarget`/`command` de l'amfitrió a l'interior `&lt;button&gt;` (IDL).

#### Parameters

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

#### Returns

`void`

---

### variantClass

> **variantClass**: (`name`, `host`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Construïu una classe `.instui-&lt;name&gt;` amb un modificador `-color-&lt;variant&gt;` opcional de `variant`.

#### Parameters

##### name

`string`

##### host

`HTMLElement`

#### Returns

`string`

---

### iconSvg

> **iconSvg**: (`name`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Resolt un nom d'icona a SVG inline (cadena buida quan és desconeguda).

#### Parameters

##### name

`string`

#### Returns

`string`

---

### locale

> **locale**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Etiqueta de configuració regional BCP47 utilitzada per al format `toLocaleDateString` i `Intl`.

---

### dir

> **dir**: `"ltr"` \| `"rtl"`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Direcció del text derivada del paquet de configuració regional actiu.

---

### firstDay

> **firstDay**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Primer dia de la setmana com índex JS `Date.getDay()` (0=diumenge … 6=dissabte).

---

### strings

> **strings**: [`WebComponentStrings`](WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Cadenes de la interfície d'usuari traduïdes per a tots els elements de comportament.
