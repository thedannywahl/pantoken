[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / PantokenIcon

# Interface: PantokenIcon

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Et pantoken-ikon, afledt fra et `&lt;image&gt;` token.

## Properties

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ikonnavnet uden `--instui-icon-` præfiks (f.eks. `arrow-left`).

---

### dataUri

> **dataUri**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Værdien `url('data:image/svg+xml;utf8,…')`, som den gemmes i IR.

---

### svg

> **svg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Dekoderet inline SVG-markering, stribet for `&lt;script&gt;` elementer og event-handler-attributter. Stammer fra leverandør-IR (fastgjort opstrøms). Sikkert for pålidelige injektionskontekster; forbrugere bør ikke behandle dette som sikkert til injektion i angriber-kontrolleret HTML.

---

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

SVG `viewBox`, når det er kendt.

---

### bidirectional

> **bidirectional**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Om ikonet vender horisontalt i højre-til-venstre-kontekster.

---

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Glyphens oprindelse.
