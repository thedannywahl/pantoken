[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenMeta

# อินเทอร์เฟซ: TokenMeta

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Non-value metadata attached to a [Token](Token.md).

## คุณสมบัติ

### kind?

> `optional` **kind?**: `"icon"`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Marks an icon token (its `syntax` is `"&lt;image&gt;"`).

***

### style?

> `optional` **style?**: `"Custom"` \| `"Line"` \| `"Solid"`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The source style of an icon glyph.

***

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The SVG `viewBox` of an icon glyph.

***

### bidirectional?

> `optional` **bidirectional?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Whether an icon flips horizontally in right-to-left contexts.

***

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

The origin of an icon glyph.

***

### modify?

> `optional` **modify?**: [`TokenModify`](TokenModify.md)

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

A colour modifier preserved for the native lineage (Style Dictionary).

***

### deprecated?

> `optional` **deprecated?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Present on a compatibility-shim token (from a `DeprecationEntry`).

#### replacement?

> `optional` **replacement?**: `string`

#### deprecatedIn?

> `optional` **deprecatedIn?**: `string`

#### removeIn?

> `optional` **removeIn?**: `string`

#### note?

> `optional` **note?**: `string`
