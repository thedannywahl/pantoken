[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logos

# Athróg: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[] = `LOGOS`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Every available logo, sorted by name.

## Sampla

**List the layouts available for Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
