[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# פונקציה: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Create a pantoken plugin that emits layout composition rules.

## פרמטרים

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## מחזיר

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## דוגמה

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
