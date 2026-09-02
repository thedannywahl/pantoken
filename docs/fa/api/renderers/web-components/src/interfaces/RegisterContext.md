[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / RegisterContext

# رابط: RegisterContext

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

The shared state a `register()` call builds once and threads to every [ElementDefinition](ElementDefinition.md).
It carries the prefix-aware registry adapter, the `tag()` helper for nested markup, the CSS-class
prefix `I`, the Invoker Commands support flag + router, the `wrapper`/`variantClass`/`iconSvg`
factories, and locale data (`strings`, `locale`, `dir`, `firstDay`).

## خصوصیات

### registry

> **registry**: [`ElementRegistry`](ElementRegistry.md)

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

The scoped registry: rewrites `instui-&lt;base&gt;` → the active-prefix tag on `get`/`define`.

***

### tag

> **tag**: (`base`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Map a base name to the active-prefix tag (for nested markup, `querySelector`, `tagName`).

#### پارامترها

##### base

`string`

#### مقدار بازگشتی

`string`

***

### I

> **I**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

The CSS-class prefix for the inlined component sheets — always `instui`, separate from the tag prefix.

#### prefix

> `readonly` **prefix**: `"instui"`

***

### invokerSupported

> **invokerSupported**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Whether the browser supports the Invoker Commands API (`command`/`commandfor`).

***

### onCommand

> **onCommand**: `OnCommand`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Route a target's `command` events (or a click fallback) to a handler.

***

### wrapper

> **wrapper**: (`tag`, `css`, `render`, `options?`) => `void`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Define a shadow-DOM element: `&lt;style&gt;:host{display}css&lt;/style&gt;` + markup from `render(host)`.
`invoker: true` forwards the host's `popovertarget`/`command` to the inner `&lt;button&gt;` (IDL).

#### پارامترها

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

#### مقدار بازگشتی

`void`

***

### variantClass

> **variantClass**: (`name`, `host`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Build a `.instui-&lt;name&gt;` class with an optional `-color-&lt;variant&gt;` modifier from `variant`.

#### پارامترها

##### name

`string`

##### host

`HTMLElement`

#### مقدار بازگشتی

`string`

***

### iconSvg

> **iconSvg**: (`name`) => `string`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Resolve an icon name to inline SVG (empty string when unknown).

#### پارامترها

##### name

`string`

#### مقدار بازگشتی

`string`

***

### locale

> **locale**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

BCP47 locale tag used for `toLocaleDateString` and `Intl` formatting.

***

### dir

> **dir**: `"ltr"` \| `"rtl"`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Text direction derived from the active locale bundle.

***

### firstDay

> **firstDay**: `number`

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

First day of week as JS `Date.getDay()` index (0=Sunday … 6=Saturday).

***

### strings

> **strings**: [`WebComponentStrings`](WebComponentStrings.md)

<span class="instui-pill -color-warning pantoken-doc-tag">آلفا</span>

Translated UI strings for all behavioral elements.
