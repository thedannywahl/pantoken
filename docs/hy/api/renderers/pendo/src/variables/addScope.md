[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addScope

# Փոփոխական: addScope

> `const` **addScope**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ստեղծել `@scope` փաթեթապատման պլագինը:

## Type Declaration

## Պարամետրեր

### options?

[`AddScopeOptions`](../interfaces/AddScopeOptions.md)

## Վերադարձվող արժեք

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Պահանջվող PostCSS plugin նշիչ:

## Օրինակ

```ts
import postcss from "postcss";
import { addScope } from "@pantoken/pendo";

const { css } = postcss([addScope({ selector: "._pendo-step-container" })])
  .process(".x{color:red}", { from: undefined });
// "@scope ([class*=\"instui\"]._pendo-step-container) { .x{color:red} }"
```
