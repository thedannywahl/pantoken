[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / logos

# Muuttuja: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[]

Every available logo, sorted by name.

## Esimerkki

**List the layouts available for Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
