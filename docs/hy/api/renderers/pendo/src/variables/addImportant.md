[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addImportant

# Փոփոխական: addImportant

> `const` **addImportant**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ստեղծել add-`!important` պլագինը:

## Type Declaration

## Վերադարձվող արժեք

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Պահանջվող PostCSS plugin նշիչ:

## Օրինակ

```ts
import postcss from "postcss";
import { addImportant } from "@pantoken/pendo";

const { css } = postcss([addImportant()]).process(".x{color:red}", { from: undefined });
// ".x{color:red !important}"
```
