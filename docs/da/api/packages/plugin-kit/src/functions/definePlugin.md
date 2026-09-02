[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / definePlugin

# Funktion: definePlugin()

> **definePlugin**(`config`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opret en pantoken-plugin ud fra sine hooks. Resultatet er et normalt `PantokenPlugin` mærket med
muligheder udledt fra de hooks, du gav.

## Parametre

### config

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Plugin'et `name` plus nogen af `tokens`/`icons`/`css`/`rehype`/`native` hooks.

## Returnerer

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Et mærket [PantokenPlugin](../../../core/src/interfaces/PantokenPlugin.md).

## Eksempel

**Et samlet tokens + css-plugin**

```ts
import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";

const brand = definePlugin({
  name: "@acme/brand",
  tokens: (ctx) => [
    ...ctx.tokens,
    ctx.define({ name: "--instui-brand", value: "var(--instui-color-background-brand)" }),
  ],
  css: () => ({ append: ":root { color-scheme: light dark; }" }),
});

capabilitiesOf(brand); // → ["tokens", "css"]
```
