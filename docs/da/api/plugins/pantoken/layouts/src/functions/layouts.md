[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Funktion: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opret et pantoken-plugin, der udsender layout-kompositionsregler.

## Parametre

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Returnerer

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Eksempel

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
