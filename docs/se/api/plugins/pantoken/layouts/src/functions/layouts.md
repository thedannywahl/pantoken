[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Fušla: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Create a pantoken plugin that emits layout composition rules.

## Parametera

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Gullii / Gávdnat

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Exempel

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
