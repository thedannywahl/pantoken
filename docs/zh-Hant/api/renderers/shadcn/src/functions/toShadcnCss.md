[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# 函式: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Emit the shadcn → Instructure CSS-variable bridge.

## 參數

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## 回傳

`string`

The bridging CSS string.

## 範例

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
