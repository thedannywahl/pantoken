[pantoken](../../../../index.md) / [formats/components/src](../index.md) / elevationCss

# Function: elevationCss()

> **elevationCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construir el bloc del token d'elevació: `&lt;selector&gt; { --instui-elevation-*: … }`. Expedidat dins `components.css` (així que les ombres són intrínseques — sense complement, sense importació addicional), i reutilitzable per altres sortides estratificades (p. ex., el renderitzador de Pendo) mitjançant l'opció `selector`.

```demo
self:elevation
```

## Parameters

### options?

`selector` — el selector de regles (per defecte `:root`).

#### selector?

`string`

## Returns

`string`

La cadena CSS.

## Example

```ts
import { elevationCss } from "@pantoken/components";

elevationCss(); // ":root { --instui-elevation-resting: …; --instui-elevation-above: …; … }"
```
