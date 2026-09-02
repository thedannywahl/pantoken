[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addImportant

# متغیر: addImportant

> `const` **addImportant**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Create the add-`!important` plugin.

## Type Declaration

## مقدار بازگشتی

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.

## نمونه

```ts
import postcss from "postcss";
import { addImportant } from "@pantoken/pendo";

const { css } = postcss([addImportant()]).process(".x{color:red}", { from: undefined });
// ".x{color:red !important}"
```
