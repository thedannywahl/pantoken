[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / logos

# متغير: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[]

كل شعار متاح، مُرتَّب حسب الاسم.

## مثال

**قائمة بالتخطيطات المتاحة لـ Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
