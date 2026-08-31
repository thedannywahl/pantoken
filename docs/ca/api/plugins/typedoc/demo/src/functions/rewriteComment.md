[pantoken](../../../../../index.md) / [plugins/typedoc/demo/src](../index.md) / rewriteComment

# Function: rewriteComment()

> **rewriteComment**(`comment`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Moveu cada etiqueta de bloc `@demo` en un comentari a tanques `demo` afegides al seu resum, en ordre.
El contingut de l'etiqueta de bloc es torna a tancar per tema de descompte, de manera que la tanca ha de viure al resum
prosa, que s'emet verbatim.

## Parameters

### comment

`Comment`

El comentari a reescriure al lloc.

## Returns

`void`

## Example

````ts
import { rewriteComment } from "@pantoken/typedoc-plugin-demo";

// Given a comment with `@demo self:button`, appends a ```demo``` fence and drops the tag.
rewriteComment(comment);
````
