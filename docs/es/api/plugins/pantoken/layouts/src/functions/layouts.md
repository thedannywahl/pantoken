[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Función: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Parámetros

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Devuelve

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Ejemplo

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
