[pantoken](../../../../index.md) / [platforms/jekyll/src](../index.md) / toJekyllAssets

# Function: toJekyllAssets()

> **toJekyllAssets**(): [`JekyllFile`](../interfaces/JekyllFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

بناء ملفات أصول الرموز لموقع Jekyll (المسارات نسبية إلى جذر الموقع).

## Returns

[`JekyllFile`](../interfaces/JekyllFile.md)[]

جزء Sass (`_sass/pantoken.scss`)، ورقة الأنماط العادية
(`assets/css/pantoken.css`)، وورقة أنماط النثر (`assets/css/pantoken-prose.css`).

## Example

**اكتب الأصول تحت جذر الموقع**

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
