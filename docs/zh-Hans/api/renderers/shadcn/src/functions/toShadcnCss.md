[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# 函数: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Emit the shadcn → Instructure CSS-variable bridge.

## 参数

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## 返回值

`string`

The bridging CSS string.

## 示例

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
