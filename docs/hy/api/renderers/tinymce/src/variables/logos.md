[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / logos

# Փոփոխական: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[]

Յուրաքանչյուր հասանելի լոգո, անվանմամբ տեսակավորված:

## Օրինակ

**Թվել դասավորումներ Canvas-ի համար հասանելի**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
