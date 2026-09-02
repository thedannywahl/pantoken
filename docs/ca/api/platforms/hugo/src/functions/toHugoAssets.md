[pantoken](../../../../index.md) / [platforms/hugo/src](../index.md) / toHugoAssets

# Funció: toHugoAssets()

> **toHugoAssets**(): [`HugoFile`](../interfaces/HugoFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Construir els fitxers d'actius de token per a un lloc Hugo (camins relatius a l'arrel del lloc).

## Retorna

[`HugoFile`](../interfaces/HugoFile.md)[]

La parcial Sass (`assets/scss/_pantoken.scss`), la fulla d'estils plana
(`assets/css/pantoken.css`), i la fulla d'estils de prosa (`assets/css/pantoken-prose.css`).

## Exemple

**Escriviu els actius sota l'arrel d'un lloc**

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
