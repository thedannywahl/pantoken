[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenMeta

# Interface: TokenMeta

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

البيانات الوصفية غير المرتبطة بالقيمة المرفقة برمز [Token](Token.md).

## Properties

### kind?

> `optional` **kind?**: `"icon"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

يعلم رمز الرموز (يكون `syntax` الخاص به `"&lt;image&gt;"`).

---

### style?

> `optional` **style?**: `"Custom"` \| `"Line"` \| `"Solid"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

نمط مصدر حرف الرموز.

---

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

SVG `viewBox` لحرف الرموز.

---

### bidirectional?

> `optional` **bidirectional?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

ما إذا كان الرمز يقلب أفقياً في السياقات من اليمين إلى اليسار.

---

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

أصل حرف الرموز.

---

### modify?

> `optional` **modify?**: [`TokenModify`](TokenModify.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

معدِّل لون محفوظ للنسب الأصلي (Style Dictionary).

---

### deprecated?

> `optional` **deprecated?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

موجود على رمز shim التوافق (من `DeprecationEntry`).

#### replacement?

> `optional` **replacement?**: `string`

#### deprecatedIn?

> `optional` **deprecatedIn?**: `string`

#### removeIn?

> `optional` **removeIn?**: `string`

#### note?

> `optional` **note?**: `string`
