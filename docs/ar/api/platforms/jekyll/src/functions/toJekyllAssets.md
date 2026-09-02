[pantoken](../../../../index.md) / [platforms/jekyll/src](../index.md) / toJekyllAssets

# دالة: toJekyllAssets()

> **toJekyllAssets**(): [`JekyllFile`](../interfaces/JekyllFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

بناء ملفات أصول الرموز لموقع Jekyll (المسارات نسبةً إلى جذر الموقع).

## القيم المرجعة

[`JekyllFile`](../interfaces/JekyllFile.md)[]

مقطع Sass الجزئي (`_sass/pantoken.scss`), ملف الأنماط العادي
(`assets/css/pantoken.css`), وملف أنماط النص (`assets/css/pantoken-prose.css`).

## مثال

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
