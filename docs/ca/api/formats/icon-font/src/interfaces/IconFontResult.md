[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# Interface: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Els artefactes de font generats.

## Properties

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Els bytes de font TrueType.

---

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Els bytes de font WOFF2.

---

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

La fulla d'estils `@font-face` + `.instui-icon-&lt;name&gt;`.

---

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Nom de l'icona → punt de codi hex (p. ex. `"e001"`).
