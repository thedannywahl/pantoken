[pantoken](../../../../index.md) / [packages/model/src](../index.md) / DeprecationEntry

# Interfície: DeprecationEntry

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Una entrada en el registre de deprecació de tokens — el cicle de vida d'un token ascendent únic eliminat.

Un valor shim prové de `replacement` (emetre `var(replacement)`, de manera que el tema flueix) O
`value` (congela l'últim literal conegut, quan l'eliminació no té reemplaçament canònic). Es preveu exactament un;
una entrada sense cap no emet cap shim.

## Propietats

### token

> **token**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El nom del token ascendent eliminat, p. ex. `--instui-component-truncate-text-line-height`.

***

### deprecatedIn

> **deprecatedIn**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

La versió ascendent que el va eliminar, `&lt;tier&gt;@&lt;version&gt;` (p. ex. `"design-tokens@v1.5.0"`).

***

### removeIn

> **removeIn**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El MINOR ascendent en el qual el shim es retira, `&lt;tier&gt;@&lt;version&gt;` (p. ex. `"design-tokens@v1.6.0"`).

***

### replacement?

> `optional` **replacement?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Reenviar el shim a un token canònic (emet `var(replacement)`).

***

### value?

> `optional` **value?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Congela el shim a un literal (el valor últim conegut del token) quan no hi ha reemplaçament.

***

### note?

> `optional` **note?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Una nota humana representada en la documentació de compatibilitat i el registre de canvis.
