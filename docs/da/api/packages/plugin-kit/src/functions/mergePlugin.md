[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / mergePlugin

# Function: mergePlugin()

> **mergePlugin**(...`plugins`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Kombiner flere plugins til et, og fold dem fra venstre til højre med [extendPlugin](extendPlugin.md).

## Parameters

### plugins

...[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

De plugins, der skal flettes (mindst en).

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Et enkelt mærket plugin.

## Example

**Kombiner jævnaldrende plugins til et**

```ts
import { capabilitiesOf, definePlugin, mergePlugin } from "@pantoken/plugin-kit";

const brand = definePlugin({ name: "brand", tokens: (c) => c.tokens });
const glyphs = definePlugin({ name: "glyphs", icons: () => [{ name: "star" }] });

const combined = mergePlugin(brand, glyphs);
capabilitiesOf(combined); // → ["tokens", "icons"]
```
