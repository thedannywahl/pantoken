[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / toDemoFence

# Ֆունկցիա: toDemoFence()

> **toDemoFence**(`spec`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Պտուտակել մեկ demo spec-ը fence-ված `demo` block-ի մեջ:

## Պարամետրեր

### spec

`string`

Demo spec: բաց URL կամ `&lt;provider&gt;:&lt;ref&gt;` զույգ:

## Վերադարձվող արժեք

`string`

Fence-ված code block-ը որպես string:

## Օրինակ

```ts
import { toDemoFence } from "@pantoken/typedoc-plugin-demo";

toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
```
