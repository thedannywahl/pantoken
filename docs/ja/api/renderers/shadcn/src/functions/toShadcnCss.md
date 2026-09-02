[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# 関数: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Emit the shadcn → Instructure CSS-variable bridge.

## パラメーター

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## 戻り値

`string`

The bridging CSS string.

## 例

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
