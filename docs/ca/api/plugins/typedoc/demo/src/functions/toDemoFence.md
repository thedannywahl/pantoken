[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / toDemoFence

# Function: toDemoFence()

> **toDemoFence**(`spec`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Embolcalleu una especificació de demostració en un bloc tancat `demo`.

## Parameters

### spec

`string`

Una especificació de demostració: una URL nua o una parella `&lt;provider&gt;:&lt;ref&gt;`.

## Returns

`string`

El bloc de codi tancat com a cadena.

## Example

````ts
import { toDemoFence } from "@pantoken/typedoc-plugin-demo";

toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
````
