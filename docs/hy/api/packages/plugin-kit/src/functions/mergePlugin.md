[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / mergePlugin

# Ֆունկցիա: mergePlugin()

> **mergePlugin**(...`plugins`): [`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Համատեղել մի քանի վարիչներ մեկի մեջ՝ դրանք ձախից աջ ծալելով [extendPlugin](extendPlugin.md) հետ:

## Պարամետրեր

### plugins

...[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)[]

Միաձուլվելիք վարիչներ (առնվազն մեկ):

## Վերադարձվող արժեք

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

Մեկ հատ չափորոշված վարիչ:

## Օրինակ

**Հավասար վարիչներ համատեղել մեկի մեջ**

```ts
import { capabilitiesOf, definePlugin, mergePlugin } from "@pantoken/plugin-kit";

const brand = definePlugin({ name: "brand", tokens: (c) => c.tokens });
const glyphs = definePlugin({ name: "glyphs", icons: () => [{ name: "star" }] });

const combined = mergePlugin(brand, glyphs);
capabilitiesOf(combined); // → ["tokens", "icons"]
```
