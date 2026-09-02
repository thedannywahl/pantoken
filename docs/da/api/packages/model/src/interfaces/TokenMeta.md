[pantoken](../../../../index.md) / [packages/model/src](../index.md) / TokenMeta

# Interface: TokenMeta

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ikke-værdi-metadata vedhæftet til et [Token](Token.md).

## Egenskaber

### kind?

> `optional` **kind?**: `"icon"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Markerer et ikon-token (dets `syntax` er `"&lt;image&gt;"`).

***

### style?

> `optional` **style?**: `"Custom"` \| `"Line"` \| `"Solid"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Kildetylen for en ikon-glyf.

***

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

SVG'ens `viewBox` for en ikon-glyf.

***

### bidirectional?

> `optional` **bidirectional?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Hvorvidt et ikon vender vandret i højre-til-venstre-kontekster.

***

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Oprindelsen af en ikon-glyf.

***

### modify?

> `optional` **modify?**: [`TokenModify`](TokenModify.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

En farvemodifikator bevaret til den oprindelige linje (Style Dictionary).

***

### deprecated?

> `optional` **deprecated?**: `object`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Til stede på et kompatibilitetsskjold-token (fra en `DeprecationEntry`).

#### replacement?

> `optional` **replacement?**: `string`

#### deprecatedIn?

> `optional` **deprecatedIn?**: `string`

#### removeIn?

> `optional` **removeIn?**: `string`

#### note?

> `optional` **note?**: `string`
