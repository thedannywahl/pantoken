[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / extendPlugin

# Funktion: extendPlugin()

> **extendPlugin**(`base`, `overrides`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opbyg et plugin oven på et andet. Hooks på samme trin sammensættes: `tokens` kører `base` derefter
`overrides` (som ser basens output); `css` fusionerer begge `CssContribution`'er; `icons`/`native` kører
begge; `rehype` kæder resolvers (overstyrer først). Kapaciteter er foreningen.

## Parametre

### base

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Plugin'et, der skal udvides.

### overrides

`Partial`\<[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)\>

Hooks (og en valgfri `name`) lagdelt øverst.

## Returnerer

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Et nyt mærket plugin.

## Eksempel

**Tilføj et ekstra CSS-bidrag oven på et base-plugin**

```ts
import { definePlugin, extendPlugin } from "@pantoken/plugin-kit";

const base = definePlugin({ name: "brand", css: () => ({ append: ":root {}" }) });
const themed = extendPlugin(base, { css: () => ({ append: ".dark {}" }) });
// themed.css merges both contributions; its append holds ":root {}\n\n.dark {}"
```
