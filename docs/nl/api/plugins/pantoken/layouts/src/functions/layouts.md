[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Functie: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Create a pantoken plugin that emits layout composition rules.

## Parameters

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Retourneert

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Voorbeeld

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
