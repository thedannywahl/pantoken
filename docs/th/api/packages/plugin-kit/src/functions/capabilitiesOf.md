[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# ฟังก์ชัน: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## พารามิเตอร์

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## คืนค่า

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## ตัวอย่าง

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
