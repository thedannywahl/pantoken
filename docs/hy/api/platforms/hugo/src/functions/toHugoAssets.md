[pantoken](../../../../index.md) / [platforms/hugo/src](../index.md) / toHugoAssets

# Function: toHugoAssets()

> **toHugoAssets**(): [`HugoFile`](../interfaces/HugoFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կառուցել թոկենային ակտիվ ֆայլերը Hugo կայքի համար (ուղիները կայքի root-ի համեմատ):

## Returns

[`HugoFile`](../interfaces/HugoFile.md)[]

Sass մասնակի (`assets/scss/_pantoken.scss`), պարզ ոճի թերթ
(`assets/css/pantoken.css`), և արձակ ոճի թերթ (`assets/css/pantoken-prose.css`):

## Example

**Գրել ակտիվները կայքի root-ի տակ**

```ts
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { toHugoAssets } from "@pantoken/hugo";

for (const { path, content } of toHugoAssets()) {
  const dest = join("./my-site", path);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, content);
}
```
