[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Mahi: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin that emits layout composition rules.

## Ngā Tawhā

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Whakahokia

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Tauira

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
