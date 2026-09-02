[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Funksjon: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Parametrar

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Returnerer

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Døme

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
