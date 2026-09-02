[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logos

# متغير: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[] = `LOGOS`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

كل شعار متاح، مُرتَّب حسب الاسم.

## مثال

**قائمة بالتخطيطات المتاحة لـ Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
