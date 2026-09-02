[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# 介面: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The generated font artifacts.

## 屬性

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The TrueType font bytes.

***

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The WOFF2 font bytes.

***

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

The `@font-face` + `.instui-icon-&lt;name&gt;` stylesheet.

***

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Icon name → hex codepoint (e.g. `"e001"`).
