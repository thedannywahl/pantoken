[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / RegisterContext

# Grensesnitt: RegisterContext

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

The shared state a `register()` call builds once and threads to every [ElementDefinition](ElementDefinition.md).
It carries the prefix-aware registry adapter, the `tag()` helper for nested markup, the CSS-class
prefix `I`, the Invoker Commands support flag + router, the `wrapper`/`variantClass`/`iconSvg`
factories, and locale data (`strings`, `locale`, `dir`, `firstDay`).

## Egenskaper

### registry

> **registry**: [`ElementRegistry`](ElementRegistry.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

The scoped registry: rewrites `instui-&lt;base&gt;` → the active-prefix tag on `get`/`define`.

***

### tag

> **tag**: (`base`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Map a base name to the active-prefix tag (for nested markup, `querySelector`, `tagName`).

#### Parametere

##### base

`string`

#### Returnerer

`string`

***

### I

> **I**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

The CSS-class prefix for the inlined component sheets — always `instui`, separate from the tag prefix.

#### prefix

> `readonly` **prefix**: `"instui"`

***

### invokerSupported

> **invokerSupported**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Whether the browser supports the Invoker Commands API (`command`/`commandfor`).

***

### onCommand

> **onCommand**: `OnCommand`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Route a target's `command` events (or a click fallback) to a handler.

***

### wrapper

> **wrapper**: (`tag`, `css`, `render`, `options?`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Define a shadow-DOM element: `&lt;style&gt;:host{display}css&lt;/style&gt;` + markup from `render(host)`.
`invoker: true` forwards the host's `popovertarget`/`command` to the inner `&lt;button&gt;` (IDL).

#### Parametere

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

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Build a `.instui-&lt;name&gt;` class with an optional `-color-&lt;variant&gt;` modifier from `variant`.

#### Parametere

##### name

`string`

##### host

`HTMLElement`

#### Returnerer

`string`

***

### iconSvg

> **iconSvg**: (`name`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Resolve an icon name to inline SVG (empty string when unknown).

#### Parametere

##### name

`string`

#### Returnerer

`string`

***

### locale

> **locale**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

BCP47 locale tag used for `toLocaleDateString` and `Intl` formatting.

***

### dir

> **dir**: `"ltr"` \| `"rtl"`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Text direction derived from the active locale bundle.

***

### firstDay

> **firstDay**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

First day of week as JS `Date.getDay()` index (0=Sunday … 6=Saturday).

***

### strings

> **strings**: [`WebComponentStrings`](WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Translated UI strings for all behavioral elements.
