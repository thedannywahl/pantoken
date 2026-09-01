[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# دالة: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

القدرات التي يعلن عنها الملحق المصنع، أو `undefined` لملحق غير مصنع.

## المعلمات

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## القيم المرجعة

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## مثال

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
