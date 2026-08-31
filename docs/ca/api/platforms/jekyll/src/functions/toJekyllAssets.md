[pantoken](../../../../index.md) / [platforms/jekyll/src](../index.md) / toJekyllAssets

# Function: toJekyllAssets()

> **toJekyllAssets**(): [`JekyllFile`](../interfaces/JekyllFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Construir els fitxers d'actius de token per a un lloc Jekyll (camins relatius a l'arrel del lloc).

## Returns

[`JekyllFile`](../interfaces/JekyllFile.md)[]

La parcial Sass (`_sass/pantoken.scss`), la fulla d'estils plana
(`assets/css/pantoken.css`), i la fulla d'estils de prosa (`assets/css/pantoken-prose.css`).

## Example

**Escriviu els actius sota l'arrel d'un lloc**

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
