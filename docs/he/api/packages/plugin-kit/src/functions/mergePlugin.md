[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / mergePlugin

# פונקציה: mergePlugin()

> **mergePlugin**(...`plugins`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Combine several plugins into one, folding them left-to-right with [extendPlugin](extendPlugin.md).

## פרמטרים

### plugins

...[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

The plugins to merge (at least one).

## מחזיר

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

A single branded plugin.

## דוגמה

**Combine peer plugins into one**

```ts
import { capabilitiesOf, definePlugin, mergePlugin } from "@pantoken/plugin-kit";

const brand = definePlugin({ name: "brand", tokens: (c) => c.tokens });
const glyphs = definePlugin({ name: "glyphs", icons: () => [{ name: "star" }] });

const combined = mergePlugin(brand, glyphs);
capabilitiesOf(combined); // → ["tokens", "icons"]
```
