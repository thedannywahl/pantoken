[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Fonction: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Create a pantoken plugin that emits layout composition rules.

## Paramètres

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Renvoie

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Exemple

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
