[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logos

# Variable: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[] = `LOGOS`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

كل شعار متاح، مرتب حسب الاسم.

## Example

**قائمة التخطيطات المتاحة لـ Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
