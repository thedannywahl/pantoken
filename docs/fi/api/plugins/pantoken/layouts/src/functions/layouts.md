[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Funktio: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Parametrit

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Palauttaa

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Esimerkki

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
