[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationCss

# Function: elevationCss()

> **elevationCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg elevation token-blokken: `&lt;selector&gt; { --instui-elevation-*: … }`. Sendt indeni
`components.css` (så skygger er iboende — ingen plugin, ingen ekstra import), og genanvendeligt af andre
lagrede outputs (f.eks. Pendo renderer) via `selector` mulighed.

```demo
self:elevation
```

## Parameters

### options?

`selector` — regelselektoren (standard `:root`).

#### selector?

`string`

## Returns

`string`

CSS-strengen.

## Example

```ts
import { elevationCss } from "@pantoken/components";

elevationCss(); // ":root { --instui-elevation-resting: …; --instui-elevation-above: …; … }"
```
