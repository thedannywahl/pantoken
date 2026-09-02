[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# 関数: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Create a pantoken plugin that emits layout composition rules.

## パラメーター

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## 戻り値

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## 例

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
