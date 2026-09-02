[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# ממשק: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

The generated font artifacts.

## תכונות

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

The TrueType font bytes.

***

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

The WOFF2 font bytes.

***

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

The `@font-face` + `.instui-icon-&lt;name&gt;` stylesheet.

***

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Icon name → hex codepoint (e.g. `"e001"`).
