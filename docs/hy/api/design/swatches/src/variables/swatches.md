[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / swatches

# Փոփոխական: swatches

> `const` **swatches**: [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Այն `rebrand` գույնի նմուշները (լռելյայն պալետրա)։

## Օրինակ

**Կոդավորեք պատրաստի պալետրան ցանկացած ձևաչափի համար**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
writeFileSync("instructure.gpl", toGpl(swatches));
```
