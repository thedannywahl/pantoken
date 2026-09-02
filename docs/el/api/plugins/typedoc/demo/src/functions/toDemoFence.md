[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / toDemoFence

# Συνάρτηση: toDemoFence()

> **toDemoFence**(`spec`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Wrap one demo spec in a fenced `demo` block.

## Παράμετροι

### spec

`string`

A demo spec: a bare URL or a `&lt;provider&gt;:&lt;ref&gt;` pair.

## Επιστρέφει

`string`

The fenced code block as a string.

## Παράδειγμα

```ts
import { toDemoFence } from "@pantoken/typedoc-plugin-demo";

toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
```
