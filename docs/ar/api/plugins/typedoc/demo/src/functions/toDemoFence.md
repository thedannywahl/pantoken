[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / toDemoFence

# Function: toDemoFence()

> **toDemoFence**(`spec`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

لفّ مواصفات عرض توضيحي واحد في كتلة `demo` مسيّجة.

## Parameters

### spec

`string`

مواصفات عرض توضيحي: عنوان URL عادي أو زوج `&lt;provider&gt;:&lt;ref&gt;`.

## Returns

`string`

كتلة الكود المسيّجة كسلسلة نصية.

## Example

````ts
import { toDemoFence } from "@pantoken/typedoc-plugin-demo";

toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
````
