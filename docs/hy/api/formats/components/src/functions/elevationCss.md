[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationCss

# Function: elevationCss()

> **elevationCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կառուցեք բարձրացման տոկեն բլոկ՝ `&lt;selector&gt; { --instui-elevation-*: … }`։ Առաքված `components.css` ներսում (ուստի ստվերները ներհատուկ են — առանց խցանի, առանց լրացուցիչ ներմուծման), և վերօգտագործելի այլ շերտավորված ելքերով (օրինակ՝ Pendo մատուցողը) `selector` ընտրանքի միջոցով։

```demo
self:elevation
```

## Parameters

### options?

`selector` — կանոնի ընտրիչը (լռելյայն `:root`)։

#### selector?

`string`

## Returns

`string`

CSS տողը։

## Example

```ts
import { elevationCss } from "@pantoken/components";

elevationCss(); // ":root { --instui-elevation-resting: …; --instui-elevation-above: …; … }"
```
