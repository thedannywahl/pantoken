[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addScope

# वैरिएबल: addScope

> `const` **addScope**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Create the `@scope` wrapping plugin.

## Type Declaration

## पैरामीटर

### options?

[`AddScopeOptions`](../interfaces/AddScopeOptions.md)

## वापसी

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.

## उदाहरण

```ts
import postcss from "postcss";
import { addScope } from "@pantoken/pendo";

const { css } = postcss([addScope({ selector: "._pendo-step-container" })])
  .process(".x{color:red}", { from: undefined });
// "@scope ([class*=\"instui\"]._pendo-step-container) { .x{color:red} }"
```
