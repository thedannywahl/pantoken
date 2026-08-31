[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# Interface: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

تعريفات الخط المُنشأة.

## Properties

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بايتات خط TrueType.

---

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بايتات خط WOFF2.

---

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

ورقة النمط `@font-face` + `.instui-icon-&lt;name&gt;`.

---

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اسم الرمز → نقطة الرمز السادسة عشرية (مثال `"e001"`).
