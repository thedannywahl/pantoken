[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / mergePlugin

# Funktion: mergePlugin()

> **mergePlugin**(...`plugins`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Kombiner flere plugins til et, og fold dem fra venstre til højre med [extendPlugin](extendPlugin.md).

## Parametre

### plugins

...[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

De plugins, der skal flettes (mindst en).

## Returnerer

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Et enkelt mærket plugin.

## Eksempel

**Kombiner jævnaldrende plugins til et**

```ts
import { capabilitiesOf, definePlugin, mergePlugin } from "@pantoken/plugin-kit";

const brand = definePlugin({ name: "brand", tokens: (c) => c.tokens });
const glyphs = definePlugin({ name: "glyphs", icons: () => [{ name: "star" }] });

const combined = mergePlugin(brand, glyphs);
capabilitiesOf(combined); // → ["tokens", "icons"]
```
