[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationCss

# Function: elevationCss()

> **elevationCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build the elevation token block: `<selector> { --instui-elevation-*: … }`. Shipped inside
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

## Returns

`string`

The CSS string.

## Example

```ts
import { elevationCss } from "@pantoken/components";

elevationCss(); // ":root { --instui-elevation-resting: …; --instui-elevation-above: …; … }"
```
