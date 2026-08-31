[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / logos

# Variable: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[]

كل شعار متاح، مرتب حسب الاسم.

## Example

**قائمة التخطيطات المتاحة لـ Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
