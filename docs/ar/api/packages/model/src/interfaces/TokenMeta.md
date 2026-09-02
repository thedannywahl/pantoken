[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenMeta

# واجهة: TokenMeta

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بيانات وصفية غير قيمية مرتبطة بـ [Token](Token.md).

## الخصائص

### kind?

> `optional` **kind?**: `"icon"`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

يشير إلى توكن أيقونة (خاصيته `syntax` هي `"&lt;image&gt;"`).

***

### style?

> `optional` **style?**: `"Custom"` \| `"Line"` \| `"Solid"`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

نمط المصدر لشكل الأيقونة.

***

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

خاصية SVG `viewBox` لشكل الأيقونة.

***

### bidirectional?

> `optional` **bidirectional?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

ما إذا كانت الأيقونة تنعكس أفقياً في سياقات من اليمين إلى اليسار.

***

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

منشأ شكل الأيقونة.

***

### modify?

> `optional` **modify?**: [`TokenModify`](TokenModify.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

معدل لون محفوظ للنسب الأصلية (Style Dictionary).

***

### deprecated?

> `optional` **deprecated?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

موجود على توكن وسيط التوافق (من `DeprecationEntry`).

#### replacement?

> `optional` **replacement?**: `string`

#### deprecatedIn?

> `optional` **deprecatedIn?**: `string`

#### removeIn?

> `optional` **removeIn?**: `string`

#### note?

> `optional` **note?**: `string`
