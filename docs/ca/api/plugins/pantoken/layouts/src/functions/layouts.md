[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Funció: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Crea un connector pantoken que emeti regles de composició de disseny.

## Paràmetres

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Retorna

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Exemple

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
