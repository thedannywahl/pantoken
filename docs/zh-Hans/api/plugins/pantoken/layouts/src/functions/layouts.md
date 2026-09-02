[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# 函数: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## 参数

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## 返回值

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## 示例

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
