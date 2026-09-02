[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Funzione: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Parametri

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Restituisce

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Esempio

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
