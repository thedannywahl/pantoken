[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# फंक्शन: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Create a pantoken plugin that emits layout composition rules.

## पैरामीटर

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## वापसी

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## उदाहरण

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
