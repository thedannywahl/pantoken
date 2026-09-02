[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Função: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Parâmetros

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Retorna

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Exemplo

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
