[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Function: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Crea un connector pantoken que emeti regles de composició de disseny.

## Parameters

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Returns

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Example

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
