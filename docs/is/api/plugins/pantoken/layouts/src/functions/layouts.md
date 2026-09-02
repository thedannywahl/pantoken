[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Fall: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Færibreytur

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Skilar

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Dæmi

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
