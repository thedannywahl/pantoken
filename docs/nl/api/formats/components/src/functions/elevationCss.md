[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationCss

# Functie: elevationCss()

> **elevationCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Build the elevation token block: `&lt;selector&gt; { --instui-elevation-*: … }`. Shipped inside
`components.css` (so shadows are intrinsic — no plugin, no extra import), and reusable by other
layered outputs (e.g. the Pendo renderer) via the `selector` option.

```demo
self:elevation
```

## Parameters

### options?

`selector` — the rule selector (default `:root`).

#### selector?

`string`

## Retourneert

`string`

The CSS string.

## Voorbeeld

```ts
import { elevationCss } from "@pantoken/components";

elevationCss(); // ":root { --instui-elevation-resting: …; --instui-elevation-above: …; … }"
```
