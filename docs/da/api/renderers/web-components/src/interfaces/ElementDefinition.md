[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# Interface: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Et registreret brugerdefineret element: dets basis tag-navn plus en `define`, der registrerer det via konteksten.

## Egenskaber

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Basis tag-navnet, f.eks. `button` (præget til `&lt;instui-button&gt;`/`&lt;x-button&gt;` af det aktive præfiks).

## Metoder

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Registrer elementet i `ctx.registry` ved kun at bruge de delte, præfiks-bevidste hjælpere.

#### Parametre

##### ctx

[`RegisterContext`](RegisterContext.md)

#### Returnerer

`void`
