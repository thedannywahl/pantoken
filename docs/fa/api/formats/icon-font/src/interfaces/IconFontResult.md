[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# رابط: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The generated font artifacts.

## خصوصیات

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The TrueType font bytes.

***

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The WOFF2 font bytes.

***

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

The `@font-face` + `.instui-icon-&lt;name&gt;` stylesheet.

***

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Icon name → hex codepoint (e.g. `"e001"`).
