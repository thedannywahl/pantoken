[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnFile

# Interface: CdnFile

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Un fitxer únic per carregar des d'una CDN, identificat pel nom del paquet npm i el camí dins d'ell.

## Properties

### package

> **package**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

El nom del paquet npm, p. ex. `"@pantoken/components"`.

---

### path?

> `optional` **path?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

La ruta dins del paquet, p. ex. `"dist/components.css"`. Omet-ho per fer referència a l'arrel del paquet.

---

### version?

> `optional` **version?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Sobrescriu la versió de nivell de proveïdor/construcció només per a aquest fitxer.

---

### raw?

> `optional` **raw?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Per a proveïdors que transformen JS per defecte (esm.sh): `false` permet que el proveïdor apliqui la seva transformació
ESM normal (necessari per `import` un punt d'entrada de paquet real). Per defecte `true` — serveix el
fitxer literalment, necessari per als actius preconstructed/no-ESM com ara full CSS i grups IIFE.
