[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Swyddogaeth: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Create a pantoken plugin that emits layout composition rules.

## Paramedrau

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Yn dychwelyd

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Enghraifft

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
