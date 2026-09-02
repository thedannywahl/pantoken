[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Hàm: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Tham số

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Trả về

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Ví dụ

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
