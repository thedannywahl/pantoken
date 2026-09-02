[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logos

# Փոփոխական: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[] = `LOGOS`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Յուրաքանչյուր հասանելի լոգո, անվանմամբ տեսակավորված:

## Օրինակ

**Թվել դասավորումներ Canvas-ի համար հասանելի**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
