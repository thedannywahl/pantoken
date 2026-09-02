[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Fonksyon: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Paramèt

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Retounen

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Egzanp

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
