[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addImportant

# Variable: addImportant

> `const` **addImportant**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Crea el connector d'afegiment-`!important`.

## Type Declaration

## Retorna

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Marcador requerida del connector de PostCSS.

## Exemple

```ts
import postcss from "postcss";
import { addImportant } from "@pantoken/pendo";

const { css } = postcss([addImportant()]).process(".x{color:red}", { from: undefined });
// ".x{color:red !important}"
```
