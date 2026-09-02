[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / logos

# 変数: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[]

Every available logo, sorted by name.

## 例

**List the layouts available for Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
