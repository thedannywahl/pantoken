[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / logos

# Variabel: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[]

Alle tilgængelige logoer, sorteret efter navn.

## Eksempel

**Vis de layouts, der er tilgængelige for Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
