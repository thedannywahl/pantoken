[pantoken](../../../../index.md) / [platforms/jekyll/src](../index.md) / toJekyllAssets

# फंक्शन: toJekyllAssets()

> **toJekyllAssets**(): [`JekyllFile`](../interfaces/JekyllFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Build the token asset files for a Jekyll site (paths relative to the site root).

## वापसी

[`JekyllFile`](../interfaces/JekyllFile.md)[]

The Sass partial (`_sass/pantoken.scss`), the plain stylesheet
(`assets/css/pantoken.css`), and the prose stylesheet (`assets/css/pantoken-prose.css`).

## उदाहरण

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
