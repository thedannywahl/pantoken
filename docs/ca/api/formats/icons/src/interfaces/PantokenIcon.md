[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / PantokenIcon

# Interface: PantokenIcon

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Una icona pantoken, derivada d'un token `&lt;image&gt;`.

## Properties

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El nom de l'icona, sense el prefix `--instui-icon-` (p. ex. `arrow-left`).

---

### dataUri

> **dataUri**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El valor `url('data:image/svg+xml;utf8,…')`, tal com s'emmagatzema a l'IR.

---

### svg

> **svg**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El marcatge SVG en línia descodificat, despullat d'elements `&lt;script&gt;` i atributs de gestor d'esdeveniments. Prové de l'IR venedor (fixat a l'amunt). Segur per a contextos d'injecció de confiança; els consumidors no haurien de tractar-lo com a segur per a injecció en HTML controlat per atacants.

---

### viewBox?

> `optional` **viewBox?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El `viewBox` SVG, quan es coneix.

---

### bidirectional

> **bidirectional**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Si l'icona es gira horitzontalment en contextos de dreta a esquerra.

---

### source?

> `optional` **source?**: `"custom"` \| `"lucide"`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

L'origen del glif.
