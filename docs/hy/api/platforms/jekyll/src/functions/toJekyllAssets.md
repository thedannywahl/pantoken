[pantoken](../../../../index.md) / [platforms/jekyll/src](../index.md) / toJekyllAssets

# Function: toJekyllAssets()

> **toJekyllAssets**(): [`JekyllFile`](../interfaces/JekyllFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կառուցել թոկենային ակտիվ ֆայլերը Jekyll կայքի համար (ուղիները կայքի root-ի համեմատ):

## Returns

[`JekyllFile`](../interfaces/JekyllFile.md)[]

Sass մասնակի (`_sass/pantoken.scss`), պարզ ոճի թերթ
(`assets/css/pantoken.css`), և արձակ ոճի թերթ (`assets/css/pantoken-prose.css`):

## Example

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
