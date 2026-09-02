[pantoken](../../../../../index.md) / [plugins/pantoken/layouts/src](../index.md) / layouts

# Ֆունկցիա: layouts()

> **layouts**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ստեղծել pantoken բնակիչ, որը արձակում է դասավորման բաղադրություն կանոններ:

## Պարամետրեր

### options?

[`LayoutsOptions`](../interfaces/LayoutsOptions.md) = `{}`

## Վերադարձվող արժեք

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

## Օրինակ

```ts
const css = toCss(byTheme("rebrand"), { plugins: [layouts()] });
```
