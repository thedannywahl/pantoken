[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / buildIconFont

# Function: buildIconFont()

> **buildIconFont**(`options?`): `Promise`\<[`IconFontResult`](../interfaces/IconFontResult.md)>>>>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Կառուցել պատկերային տառատեսակը:

## Parameters

### options?

[`BuildIconFontOptions`](../interfaces/BuildIconFontOptions.md) = `{}`

[BuildIconFontOptions](../interfaces/BuildIconFontOptions.md).

## Returns

`Promise`\<[`IconFontResult`](../interfaces/IconFontResult.md)\>

[IconFontResult](../interfaces/IconFontResult.md):

## Examples

**Կառուցել լրիվ տառատեսակը և գրել արտեֆակտները**

```ts
import { buildIconFont } from "@pantoken/icon-font";
import { writeFileSync } from "node:fs";

const font = await buildIconFont();
writeFileSync("PanTokens.woff2", font.woff2);
writeFileSync("PanTokens.ttf", font.ttf);
writeFileSync("icons.css", font.css);
```

**Հատուկ տառատեսակի անուն և պատկերների ենթամոդուլ մեկ այլ թեմայից**

```ts
import { buildIconFont } from "@pantoken/icon-font";

const font = await buildIconFont({
  fontName: "Instructure",
  icons: ["arrow-left", "check-mark"],
  theme: "canvas",
});
font.codepoints; // { "arrow-left": "e000", "check-mark": "e001" }
```
