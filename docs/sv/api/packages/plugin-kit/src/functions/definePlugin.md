[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / definePlugin

# Funktion: definePlugin()

> **definePlugin**(`config`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create a pantoken plugin from its hooks. The result is a normal `PantokenPlugin` branded with the
capabilities inferred from the hooks you provided.

## Parametrar

### config

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

The plugin `name` plus any of the `tokens`/`icons`/`css`/`rehype`/`native` hooks.

## Returnerar

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

A branded [PantokenPlugin](../../../core/src/interfaces/PantokenPlugin.md).

## Exempel

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
