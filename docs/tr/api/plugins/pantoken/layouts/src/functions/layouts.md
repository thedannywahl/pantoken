[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Fonksiyon: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Parametreler

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Döndürür

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Örnek

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
