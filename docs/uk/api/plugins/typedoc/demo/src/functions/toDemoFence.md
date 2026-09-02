[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / toDemoFence

# Функція: toDemoFence()

> **toDemoFence**(`spec`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Wrap one demo spec in a fenced `demo` block.

## Параметри

### spec

`string`

A demo spec: a bare URL or a `&lt;provider&gt;:&lt;ref&gt;` pair.

## Повертає

`string`

The fenced code block as a string.

## Приклад

```ts
import { toDemoFence } from "@pantoken/typedoc-plugin-demo";

toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
```
