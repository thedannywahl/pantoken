[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / toDemoFence

# Function: toDemoFence()

> **toDemoFence**(`spec`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Պտուտակել մեկ demo spec-ը fence-ված `demo` block-ի մեջ:

## Parameters

### spec

`string`

Demo spec: բաց URL կամ `&lt;provider&gt;:&lt;ref&gt;` զույգ:

## Returns

`string`

Fence-ված code block-ը որպես string:

## Example

````ts
import { toDemoFence } from "@pantoken/typedoc-plugin-demo";

toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
````
