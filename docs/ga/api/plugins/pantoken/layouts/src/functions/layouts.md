[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Feidhm: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Create a pantoken plugin that emits layout composition rules.

## Paraiméadair

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Tuairisceáin

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Sampla

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
