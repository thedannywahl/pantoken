[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenMeta

# Interface: TokenMeta

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Non-value metadata կցված [Token](Token.md)-ին:

## Properties

### kind?

> `optional` **kind?**: `"icon"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Պատկերակի token-ի նշում (նրա `syntax` է `"&lt;image&gt;"`):

---

### style?

> `optional` **style?**: `"Custom"` \| `"Line"` \| `"Solid"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Պատկերակի գլիֆի աղբյուր ոճը:

---

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

SVG `viewBox` պատկերակի գլիֆի:

---

### bidirectional?

> `optional` **bidirectional?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Պատկերակը հորիզոնական շրջում է աջից-ձախ համատեքստում:

---

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Պատկերակի գլիֆի ծագումը:

---

### modify?

> `optional` **modify?**: [`TokenModify`](TokenModify.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Գույն փոփոխիչ` պահպանված բնական տեղերամբ (Style Dictionary):

---

### deprecated?

> `optional` **deprecated?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Առաջ լինել compatibility-shim token-ի վրա (`DeprecationEntry`):

#### replacement?

> `optional` **replacement?**: `string`

#### deprecatedIn?

> `optional` **deprecatedIn?**: `string`

#### removeIn?

> `optional` **removeIn?**: `string`

#### note?

> `optional` **note?**: `string`
