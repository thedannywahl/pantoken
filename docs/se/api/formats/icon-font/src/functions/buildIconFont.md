[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / buildIconFont

# Fušla: buildIconFont()

> **buildIconFont**(`options?`): `Promise`\<[`IconFontResult`](../interfaces/IconFontResult.md)\>

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Build the icon font.

## Parametera

### options?

[`BuildIconFontOptions`](../interfaces/BuildIconFontOptions.md) = `{}`

[BuildIconFontOptions](../interfaces/BuildIconFontOptions.md).

## Gullii / Gávdnat

`Promise`\<[`IconFontResult`](../interfaces/IconFontResult.md)\>

The [IconFontResult](../interfaces/IconFontResult.md).

## Exempla

**Build the full font and write the artifacts**

```ts
import { buildIconFont } from "@pantoken/icon-font";
import { writeFileSync } from "node:fs";

const font = await buildIconFont();
writeFileSync("PanTokens.woff2", font.woff2);
writeFileSync("PanTokens.ttf", font.ttf);
writeFileSync("icons.css", font.css);
```

**A custom font name and a subset of icons from another theme**

```ts
import { buildIconFont } from "@pantoken/icon-font";

const font = await buildIconFont({
  fontName: "Instructure",
  icons: ["arrow-left", "check-mark"],
  theme: "canvas",
});
font.codepoints; // { "arrow-left": "e000", "check-mark": "e001" }
```
