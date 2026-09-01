[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addScope

# متغير: addScope

> `const` **addScope**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إنشاء المكوّن الإضافي لتغليف `@scope`.

## Type Declaration

## المعلمات

### options?

[`AddScopeOptions`](../interfaces/AddScopeOptions.md)

## القيم المرجعة

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

علامة مكوّن PostCSS المطلوبة.

## مثال

```ts
import postcss from "postcss";
import { addScope } from "@pantoken/pendo";

const { css } = postcss([addScope({ selector: "._pendo-step-container" })])
  .process(".x{color:red}", { from: undefined });
// "@scope (._pendo-step-container) { .x{color:red} }"
```
