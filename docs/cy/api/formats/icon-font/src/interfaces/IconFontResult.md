[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# Rhyngwyneb: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The generated font artifacts.

## Eiddo

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The TrueType font bytes.

***

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The WOFF2 font bytes.

***

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

The `@font-face` + `.instui-icon-&lt;name&gt;` stylesheet.

***

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Icon name → hex codepoint (e.g. `"e001"`).
