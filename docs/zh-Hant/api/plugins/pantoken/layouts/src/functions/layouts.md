[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# 函式: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Create a pantoken plugin that emits layout composition rules.

## 參數

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## 回傳

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## 範例

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
