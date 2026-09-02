[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / toDemoFence

# Funktion: toDemoFence()

> **toDemoFence**(`spec`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Indpak en demo-specifikation i et hegnede `demo`-blok.

## Parametre

### spec

`string`

En demo-specifikation: en nøgen URL eller et `&lt;provider&gt;:&lt;ref&gt;`-par.

## Returnerer

`string`

Det hegnede kodeblok som en streng.

## Eksempel

```ts
import { toDemoFence } from "@pantoken/typedoc-plugin-demo";

toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
```
