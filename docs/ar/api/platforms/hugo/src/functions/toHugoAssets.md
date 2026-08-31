[pantoken](../../../../index.md) / [platforms/hugo/src](../index.md) / toHugoAssets

# Function: toHugoAssets()

> **toHugoAssets**(): [`HugoFile`](../interfaces/HugoFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

بناء ملفات أصول الرموز لموقع Hugo (المسارات نسبية إلى جذر الموقع).

## Returns

[`HugoFile`](../interfaces/HugoFile.md)[]

جزء Sass (`assets/scss/_pantoken.scss`)، ورقة الأنماط العادية
(`assets/css/pantoken.css`)، وورقة أنماط النثر (`assets/css/pantoken-prose.css`).

## Example

**اكتب الأصول تحت جذر الموقع**

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
