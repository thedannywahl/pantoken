[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logos

# Variable: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[] = `LOGOS`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Alle tilgængelige logoer, sorteret efter navn.

## Example

**Vis de layouts, der er tilgængelige for Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
