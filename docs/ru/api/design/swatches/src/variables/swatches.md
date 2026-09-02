[pantoken](../../../../index.md) / [design/swatches/src](../index.md) / swatches

# Переменная: swatches

> `const` **swatches**: [`Swatch`](../interfaces/Swatch.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

The `rebrand` colour swatches (the default palette).

## Пример

**Encode the ready-made palette to any format**

```ts
import { writeFileSync } from "node:fs";
import { swatches, toAse, toGpl } from "@pantoken/swatches";

writeFileSync("instructure.ase", toAse(swatches));
writeFileSync("instructure.gpl", toGpl(swatches));
```
