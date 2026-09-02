[pantoken](../../../../index.md) / [platforms/jekyll/src](../index.md) / toJekyllAssets

# Ֆունկցիա: toJekyllAssets()

> **toJekyllAssets**(): [`JekyllFile`](../interfaces/JekyllFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Կառուցել թոկենային ակտիվ ֆայլերը Jekyll կայքի համար (ուղիները կայքի root-ի համեմատ):

## Վերադարձվող արժեք

[`JekyllFile`](../interfaces/JekyllFile.md)[]

Sass մասնակի (`_sass/pantoken.scss`), պարզ ոճի թերթ
(`assets/css/pantoken.css`), և արձակ ոճի թերթ (`assets/css/pantoken-prose.css`):

## Օրինակ

**Գրել ակտիվները կայքի root-ի տակ**

```ts
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { toJekyllAssets } from "@pantoken/jekyll";

for (const { path, content } of toJekyllAssets()) {
  const dest = join("./my-site", path);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, content);
}
```
