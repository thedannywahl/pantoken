[pantoken](../../../../index.md) / [platforms/hugo/src](../index.md) / toHugoAssets

# Functie: toHugoAssets()

> **toHugoAssets**(): [`HugoFile`](../interfaces/HugoFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Build the token asset files for a Hugo site (paths relative to the site root).

## Retourneert

[`HugoFile`](../interfaces/HugoFile.md)[]

The Sass partial (`assets/scss/_pantoken.scss`), the plain stylesheet
(`assets/css/pantoken.css`), and the prose stylesheet (`assets/css/pantoken-prose.css`).

## Voorbeeld

**Write the assets under a site root**

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
