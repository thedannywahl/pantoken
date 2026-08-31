[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenMeta

# Interface: TokenMeta

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Metadades sense valor adjuntes a un [Token](Token.md).

## Properties

### kind?

> `optional` **kind?**: `"icon"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Marca un token d'icona (el seu `syntax` és `"&lt;image&gt;"`).

---

### style?

> `optional` **style?**: `"Custom"` \| `"Line"` \| `"Solid"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

L'estil font d'un glif d'icona.

---

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El `viewBox` SVG d'un glif d'icona.

---

### bidirectional?

> `optional` **bidirectional?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Si una icona es gira horitzontalment en contextos de dreta a esquerra.

---

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

L'origen d'un glif d'icona.

---

### modify?

> `optional` **modify?**: [`TokenModify`](TokenModify.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un modificador de color preservat per a la línia de descendència nativa (Style Dictionary).

---

### deprecated?

> `optional` **deprecated?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Present en un token d'adaptació de compatibilitat (d'un `DeprecationEntry`).

#### replacement?

> `optional` **replacement?**: `string`

#### deprecatedIn?

> `optional` **deprecatedIn?**: `string`

#### removeIn?

> `optional` **removeIn?**: `string`

#### note?

> `optional` **note?**: `string`
