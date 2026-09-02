[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addImportant

# Variabel: addImportant

> `const` **addImportant**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opret tilføj-`!important` plugin'et.

## Type Declaration

## Returnerer

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Påkrævet PostCSS plugin marker.

## Eksempel

```ts
import postcss from "postcss";
import { addImportant } from "@pantoken/pendo";

const { css } = postcss([addImportant()]).process(".x{color:red}", { from: undefined });
// ".x{color:red !important}"
```
