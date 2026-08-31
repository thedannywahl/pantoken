[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / definePlugin

# Function: definePlugin()

> **definePlugin**(`config`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Crear un connector pantoken a partir dels seus ganxos. El resultat és un `PantokenPlugin` normal marcat amb les
capacitats inferides dels ganxos que heu proporcionat.

## Parameters

### config

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

El connector `name` més qualsevol dels ganxos `tokens`/`icons`/`css`/`rehype`/`native`.

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Un [PantokenPlugin](../../../core/src/interfaces/PantokenPlugin.md) marcat.

## Example

**Un connector unificat de tokens + css**

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
