[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Function: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

القدرات التي يعلنها المكون الإضافي المُصنّع، أو `undefined` لمكون إضافي غير مصنّع.

## Parameters

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Returns

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Example

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" }); // → undefined
```
