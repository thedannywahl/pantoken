[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# 함수: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Create a pantoken plugin that emits layout composition rules.

## 매개변수

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## 반환값

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## 예제

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
