[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / definePlugin

# Functie: definePlugin()

> **definePlugin**(`config`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Create a pantoken plugin from its hooks. The result is a normal `PantokenPlugin` branded with the
capabilities inferred from the hooks you provided.

## Parameters

### config

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

The plugin `name` plus any of the `tokens`/`icons`/`css`/`rehype`/`native` hooks.

## Retourneert

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

A branded [PantokenPlugin](../../../core/src/interfaces/PantokenPlugin.md).

## Voorbeeld

**A unified tokens + css plugin**

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
