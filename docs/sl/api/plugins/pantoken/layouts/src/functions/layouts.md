[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Funkcija: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Parametri

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Vrne

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Primer

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
