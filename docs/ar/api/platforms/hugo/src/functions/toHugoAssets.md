[pantoken](../../../../index.md) / [platforms/hugo/src](../index.md) / toHugoAssets

# دالة: toHugoAssets()

> **toHugoAssets**(): [`HugoFile`](../interfaces/HugoFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

بناء ملفات أصول التوكن لموقع Hugo (المسارات نسبةً إلى جذر الموقع).

## القيم المرجعة

[`HugoFile`](../interfaces/HugoFile.md)[]

الملف الجزئي لـSass (`assets/scss/_pantoken.scss`), وورقة الأنماط العادية
(`assets/css/pantoken.css`), وورقة أنماط النص (`assets/css/pantoken-prose.css`).

## مثال

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
