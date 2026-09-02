[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# インターフェース: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The generated font artifacts.

## プロパティ

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The TrueType font bytes.

***

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The WOFF2 font bytes.

***

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

The `@font-face` + `.instui-icon-&lt;name&gt;` stylesheet.

***

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Icon name → hex codepoint (e.g. `"e001"`).
