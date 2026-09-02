[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Συνάρτηση: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Create a pantoken plugin that emits layout composition rules.

## Παράμετροι

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Επιστρέφει

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Παράδειγμα

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
