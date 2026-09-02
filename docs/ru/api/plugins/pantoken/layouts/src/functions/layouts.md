[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Функция: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Create a pantoken plugin that emits layout composition rules.

## Параметры

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Возвращаемое значение

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Пример

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
