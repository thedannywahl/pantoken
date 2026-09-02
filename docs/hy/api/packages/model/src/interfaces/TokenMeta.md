[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenMeta

# Ինտերֆեյս: TokenMeta

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Non-value metadata կցված [Token](Token.md)-ին:

## Առանձնահատկություններ

### kind?

> `optional` **kind?**: `"icon"`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Պատկերակի token-ի նշում (նրա `syntax` է `"&lt;image&gt;"`):

***

### style?

> `optional` **style?**: `"Custom"` \| `"Line"` \| `"Solid"`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Պատկերակի գլիֆի աղբյուր ոճը:

***

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

SVG `viewBox` պատկերակի գլիֆի:

***

### bidirectional?

> `optional` **bidirectional?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Պատկերակը հորիզոնական շրջում է աջից-ձախ համատեքստում:

***

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Պատկերակի գլիֆի ծագումը:

***

### modify?

> `optional` **modify?**: [`TokenModify`](TokenModify.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Գույն փոփոխիչ` պահպանված բնական տեղերամբ (Style Dictionary):

***

### deprecated?

> `optional` **deprecated?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Առաջ լինել compatibility-shim token-ի վրա (`DeprecationEntry`):

#### replacement?

> `optional` **replacement?**: `string`

#### deprecatedIn?

> `optional` **deprecatedIn?**: `string`

#### removeIn?

> `optional` **removeIn?**: `string`

#### note?

> `optional` **note?**: `string`
