[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / logos

# Variable: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[]

Alle tilgængelige logoer, sorteret efter navn.

## Example

**Vis de layouts, der er tilgængelige for Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
