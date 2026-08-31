[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / mergePlugin

# Function: mergePlugin()

> **mergePlugin**(...`plugins`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Combina diversos plugins en un, plegant-los d'esquerra a dreta amb [extendPlugin](extendPlugin.md).

## Parameters

### plugins

...[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

Els plugins a fusionar (com a mínim un).

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Un únic plugin de marca.

## Example

**Combina plugins iguals en un**

```ts
import { capabilitiesOf, definePlugin, mergePlugin } from "@pantoken/plugin-kit";

const brand = definePlugin({ name: "brand", tokens: (c) => c.tokens });
const glyphs = definePlugin({ name: "glyphs", icons: () => [{ name: "star" }] });

const combined = mergePlugin(brand, glyphs);
capabilitiesOf(combined); // → ["tokens", "icons"]
```
