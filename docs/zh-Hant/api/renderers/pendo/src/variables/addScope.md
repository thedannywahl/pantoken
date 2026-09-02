[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / addScope

# 變數: addScope

> `const` **addScope**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Create the `@scope` wrapping plugin.

## Type Declaration

## 參數

### options?

[`AddScopeOptions`](../interfaces/AddScopeOptions.md)

## 回傳

[`Plugin`](https://postcss.org/api/#plugin)

### postcss

> **postcss**: `true`

Required PostCSS plugin marker.

## 範例

```ts
import postcss from "postcss";
import { addScope } from "@pantoken/pendo";

const { css } = postcss([addScope({ selector: "._pendo-step-container" })])
  .process(".x{color:red}", { from: undefined });
// "@scope ([class*=\"instui\"]._pendo-step-container) { .x{color:red} }"
```
