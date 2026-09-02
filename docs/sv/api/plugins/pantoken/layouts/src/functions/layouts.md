[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Funktion: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Parametrar

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Returnerar

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Exempel

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
