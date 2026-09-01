[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / buildIconFont

# دالة: buildIconFont()

> **buildIconFont**(`options?`): `Promise`\<[`IconFontResult`](../interfaces/IconFontResult.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء خط الأيقونات.

## المعلمات

### options?

[`BuildIconFontOptions`](../interfaces/BuildIconFontOptions.md) = `{}`

[BuildIconFontOptions](../interfaces/BuildIconFontOptions.md).

## القيم المرجعة

`Promise`\<[`IconFontResult`](../interfaces/IconFontResult.md)\>

الـ[IconFontResult](../interfaces/IconFontResult.md).

## أمثلة

**بناء الخط الكامل وكتابة المخرجات**

```ts
import { buildIconFont } from "@pantoken/icon-font";
import { writeFileSync } from "node:fs";

const font = await buildIconFont();
writeFileSync("PanTokens.woff2", font.woff2);
writeFileSync("PanTokens.ttf", font.ttf);
writeFileSync("icons.css", font.css);
```

**اسم خط مخصص ومجموعة فرعية من الأيقونات من سمة أخرى**

```ts
import { buildIconFont } from "@pantoken/icon-font";

const font = await buildIconFont({
  fontName: "Instructure",
  icons: ["arrow-left", "check-mark"],
  theme: "canvas",
});
font.codepoints; // { "arrow-left": "e000", "check-mark": "e001" }
```
