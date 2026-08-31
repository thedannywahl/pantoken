[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / mergePlugin

# Function: mergePlugin()

> **mergePlugin**(...`plugins`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Համատեղել մի քանի վարիչներ մեկի մեջ՝ դրանք ձախից աջ ծալելով [extendPlugin](extendPlugin.md) հետ:

## Parameters

### plugins

...[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

Միաձուլվելիք վարիչներ (առնվազն մեկ):

## Returns

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Մեկ հատ չափորոշված վարիչ:

## Example

**Հավասար վարիչներ համատեղել մեկի մեջ**

```ts
import { capabilitiesOf, definePlugin, mergePlugin } from "@pantoken/plugin-kit";

const brand = definePlugin({ name: "brand", tokens: (c) => c.tokens });
const glyphs = definePlugin({ name: "glyphs", icons: () => [{ name: "star" }] });

const combined = mergePlugin(brand, glyphs);
capabilitiesOf(combined); // → ["tokens", "icons"]
```
