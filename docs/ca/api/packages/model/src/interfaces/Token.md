[pantoken](../../../../index.md) / [packages/model/src](../index.md) / Token

# Interfície: Token

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un token de disseny únic en l'IR alineat de forma canònica `@property`.

## Propietats

### name

> **name**: `string`

El nom de la propietat personalitzada, p. ex. `--instui-color-background-base`.

***

### syntax

> **syntax**: `string`

El descriptor `@property` `syntax` (`"&lt;color&gt;"`, `"&lt;length&gt;"`,
  `"&lt;image&gt;"`, …) o `"*"` per a valors contextuals.

***

### inherits

> **inherits**: `boolean`

La bandera `@property` `inherits`.

***

### value

> **value**: `string`

Un valor concret, una referència `var(...)` o una parella `light-dark(a, b)`.

***

### themed?

> `optional` **themed?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Cert quan les resolucions clara i fosca difereixen (el valor és `light-dark()`).

***

### refersTo?

> `optional` **refersTo?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El token que aquest referencia, quan `value` és un únic `var(...)`.

***

### meta?

> `optional` **meta?**: [`TokenMeta`](TokenMeta.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Metadades sense valor.
