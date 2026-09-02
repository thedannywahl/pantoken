[pantoken](../../../../index.md) / [platforms/jekyll/src](../index.md) / toJekyllAssets

# Funktion: toJekyllAssets()

> **toJekyllAssets**(): [`JekyllFile`](../interfaces/JekyllFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Opret token-aktivfiler til et Jekyll-websted (stier relative til webstedets rod).

## Returnerer

[`JekyllFile`](../interfaces/JekyllFile.md)[]

Sass-partial (`_sass/pantoken.scss`), det almindelige stylesheet (`assets/css/pantoken.css`) og prosa-stylesheet (`assets/css/pantoken-prose.css`).

## Eksempel

**Skriv aktiverne under en webstedsrod**

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
