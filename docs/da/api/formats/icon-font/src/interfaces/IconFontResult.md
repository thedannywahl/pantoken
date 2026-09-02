[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# Interface: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

De genererede skriftartefakter.

## Egenskaber

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

TrueType-skriftbytes.

***

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

WOFF2-skriftbytes.

***

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Stylesheet for `@font-face` + `.instui-icon-&lt;name&gt;`.

***

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ikonnavn → hex-kodepunkt (f.eks. `"e001"`).
