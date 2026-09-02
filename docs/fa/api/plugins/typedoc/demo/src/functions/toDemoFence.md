[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / toDemoFence

# تابع: toDemoFence()

> **toDemoFence**(`spec`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Wrap one demo spec in a fenced `demo` block.

## پارامترها

### spec

`string`

A demo spec: a bare URL or a `&lt;provider&gt;:&lt;ref&gt;` pair.

## مقدار بازگشتی

`string`

The fenced code block as a string.

## نمونه

```ts
import { toDemoFence } from "@pantoken/typedoc-plugin-demo";

toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
```
