[pantoken](../../../../index.md) / [platforms/hugo/src](../index.md) / toHugoAssets

# Function: toHugoAssets()

> **toHugoAssets**(): [`HugoFile`](../interfaces/HugoFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Opret token-aktivfiler til et Hugo-websted (stier relative til webstedets rod).

## Returns

[`HugoFile`](../interfaces/HugoFile.md)[]

Sass-partial (`assets/scss/_pantoken.scss`), det almindelige stylesheet (`assets/css/pantoken.css`) og prosa-stylesheet (`assets/css/pantoken-prose.css`).

## Example

**Skriv aktiverne under en webstedsrod**

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
