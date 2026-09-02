[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / logos

# 變數: logos

> `const` **logos**: readonly [`LogoMeta`](../interfaces/LogoMeta.md)[] = `LOGOS`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Every available logo, sorted by name.

## 範例

**List the layouts available for Canvas**

```ts
import { logos } from "@pantoken/plugin-logos";

const canvasLayouts = logos.filter((l) => l.product === "canvas").map((l) => l.layout);
```
