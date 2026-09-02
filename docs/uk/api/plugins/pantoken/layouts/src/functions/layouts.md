[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Функція: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Create a pantoken plugin that emits layout composition rules.

## Параметри

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Повертає

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Приклад

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
