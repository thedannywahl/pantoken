[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# Διεπαφή: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The generated font artifacts.

## Ιδιότητες

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The TrueType font bytes.

***

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The WOFF2 font bytes.

***

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

The `@font-face` + `.instui-icon-&lt;name&gt;` stylesheet.

***

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Icon name → hex codepoint (e.g. `"e001"`).
