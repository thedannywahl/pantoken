[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addImportant

# متغير: addImportant

> `const` **addImportant**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

أنشئ المكوّن الإضافي add-`!important`.

## Type Declaration

## القيم المرجعة

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

علامة المكوّن الإضافي المطلوبة لـ PostCSS.

## مثال

```ts
import postcss from "postcss";
import { addImportant } from "@pantoken/pendo";

const { css } = postcss([addImportant()]).process(".x{color:red}", { from: undefined });
// ".x{color:red !important}"
```
