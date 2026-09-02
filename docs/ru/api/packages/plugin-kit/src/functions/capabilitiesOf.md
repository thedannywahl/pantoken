[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / capabilitiesOf

# Функция: capabilitiesOf()

> **capabilitiesOf**(`plugin`): [`Stage`](../type-aliases/Stage.md)[] \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.

## Параметры

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Возвращаемое значение

[`Stage`](../type-aliases/Stage.md)[] \| `undefined`

## Пример

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
capabilitiesOf({ name: "hand-written" });                                 // → undefined
```
