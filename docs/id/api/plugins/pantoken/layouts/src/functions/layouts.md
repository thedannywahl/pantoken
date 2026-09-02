[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Fungsi: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Parameter

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Mengembalikan

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Contoh

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
