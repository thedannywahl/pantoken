[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Interface: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Un element personalitzat registrat: el seu nom d'etiqueta base més un `define` que el registra a través del context.

## Properties

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

El nom de l'etiqueta base, p. ex. `button` (encunyat a `&lt;instui-button&gt;`/`&lt;x-button&gt;` pel prefix actiu).

## Methods

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Registreu l'element a `ctx.registry`, utilitzant només els ajudants compartits i conscients del prefix.

#### Parameters

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Returns

`void`
