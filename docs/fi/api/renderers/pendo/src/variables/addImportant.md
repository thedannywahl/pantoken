[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addImportant

# Muuttuja: addImportant

> `const` **addImportant**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create the add-`!important` plugin.

## Type Declaration

## Palauttaa

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.

## Esimerkki

```ts
import postcss from "postcss";
import { addImportant } from "@pantoken/pendo";

const { css } = postcss([addImportant()]).process(".x{color:red}", { from: undefined });
// ".x{color:red !important}"
```
