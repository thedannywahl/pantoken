[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addScope

# ตัวแปร: addScope

> `const` **addScope**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Create the `@scope` wrapping plugin.

## Type Declaration

## พารามิเตอร์

### options?

[`AddScopeOptions`](../interfaces/AddScopeOptions.md)

## คืนค่า

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.

## ตัวอย่าง

```ts
import postcss from "postcss";
import { addScope } from "@pantoken/pendo";

const { css } = postcss([addScope({ selector: "._pendo-step-container" })])
  .process(".x{color:red}", { from: undefined });
// "@scope ([class*=\"instui\"]._pendo-step-container) { .x{color:red} }"
```
