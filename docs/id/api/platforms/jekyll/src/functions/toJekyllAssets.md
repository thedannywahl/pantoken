[pantoken](../../../../index.md) / [platforms/jekyll/src](../index.md) / toJekyllAssets

# Fungsi: toJekyllAssets()

> **toJekyllAssets**(): [`JekyllFile`](../interfaces/JekyllFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Build the token asset files for a Jekyll site (paths relative to the site root).

## Mengembalikan

[`JekyllFile`](../interfaces/JekyllFile.md)[]

The Sass partial (`_sass/pantoken.scss`), the plain stylesheet
(`assets/css/pantoken.css`), and the prose stylesheet (`assets/css/pantoken-prose.css`).

## Contoh

**Write the assets under a site root**

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
