[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# 인터페이스: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The generated font artifacts.

## 속성

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The TrueType font bytes.

***

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The WOFF2 font bytes.

***

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

The `@font-face` + `.instui-icon-&lt;name&gt;` stylesheet.

***

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Icon name → hex codepoint (e.g. `"e001"`).
