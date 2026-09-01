[pantoken](../../../../index.md) / [formats/icon-font/src](../index.md) / IconFontResult

# واجهة: IconFontResult

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

المخرجات المولَّدة للخط.

## الخصائص

### ttf

> **ttf**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بايتات خط TrueType.

***

### woff2

> **woff2**: `Uint8Array`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بايتات خط WOFF2.

***

### css

> **css**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

ورقة الأنماط `@font-face` + `.instui-icon-&lt;name&gt;`.

***

### codepoints

> **codepoints**: `Record`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اسم الأيقونة → نقطة رمز سداسية عشرية (مثال: `"e001"`).
