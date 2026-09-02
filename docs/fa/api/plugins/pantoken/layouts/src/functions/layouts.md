[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# تابع: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Create a pantoken plugin that emits layout composition rules.

## پارامترها

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## مقدار بازگشتی

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## نمونه

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
