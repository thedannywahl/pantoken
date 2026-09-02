[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / toDemoFence

# Function: toDemoFence()

> **toDemoFence**(`spec`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Wrap one demo spec in a fenced `demo` block.

## Parameters

### spec

`string`

A demo spec: a bare URL or a `&lt;provider&gt;:&lt;ref&gt;` pair.

## Returns

`string`

The fenced code block as a string.

## Example

```ts
import { toDemoFence } from "@pantoken/typedoc-plugin-demo";

toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
```
