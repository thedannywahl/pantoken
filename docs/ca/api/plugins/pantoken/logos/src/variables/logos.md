[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logos

# Variable: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[] = `LOGOS`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tots els logotips disponibles, ordenats per nom.

## Exemple

**Llista els dissenys disponibles per a Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
