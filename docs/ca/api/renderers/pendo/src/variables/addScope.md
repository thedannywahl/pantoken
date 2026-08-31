[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addScope

# Variable: addScope

> `const` **addScope**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Crea el connector d'embolcallament `@scope`.

## Type Declaration

## Parameters

### options?

[`AddScopeOptions`](../interfaces/AddScopeOptions.md)

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Marcador requerida del connector de PostCSS.

## Example

```ts
import postcss from "postcss";
import { addScope } from "@pantoken/pendo";

const { css } = postcss([addScope({ selector: "._pendo-step-container" })]).process(
  ".x{color:red}",
  { from: undefined },
);
// "@scope (._pendo-step-container) { .x{color:red} }"
```
