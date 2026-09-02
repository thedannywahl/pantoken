[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Interfície: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Un element personalitzat registrat: el seu nom d'etiqueta base més un `define` que el registra a través del context.

## Propietats

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

El nom de l'etiqueta base, p. ex. `button` (encunyat a `&lt;instui-button&gt;`/`&lt;x-button&gt;` pel prefix actiu).

## Mètodes

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Registreu l'element a `ctx.registry`, utilitzant només els ajudants compartits i conscients del prefix.

#### Paràmetres

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Retorna

`void`
