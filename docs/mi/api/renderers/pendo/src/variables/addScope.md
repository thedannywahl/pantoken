[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addScope

# Taipūtī: addScope

> `const` **addScope**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Create the `@scope` wrapping plugin.

## Type Declaration

## Ngā Tawhā

### options?

[`AddScopeOptions`](../interfaces/AddScopeOptions.md)

## Whakahokia

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.

## Tauira

```ts
import postcss from "postcss";
import { addScope } from "@pantoken/pendo";

const { css } = postcss([addScope({ selector: "._pendo-step-container" })])
  .process(".x{color:red}", { from: undefined });
// "@scope ([class*=\"instui\"]._pendo-step-container) { .x{color:red} }"
```
