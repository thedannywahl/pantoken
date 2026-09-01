[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / toDemoFence

# دالة: toDemoFence()

> **toDemoFence**(`spec`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

ضع مواصفة عرض توضيحي واحدة داخل كتلة `demo` محاطة بأسوار.

## المعلمات

### spec

`string`

مواصفة عرض توضيحي: رابط مباشر (URL) أو زوج `&lt;provider&gt;:&lt;ref&gt;`.

## القيم المرجعة

`string`

كتلة الشيفرة المحاطة بأسوار كسلسلة نصية.

## مثال

```ts
import { toDemoFence } from "@pantoken/typedoc-plugin-demo";

toDemoFence("stackblitz:abc123"); // "```demo\nstackblitz:abc123\n```"
```
