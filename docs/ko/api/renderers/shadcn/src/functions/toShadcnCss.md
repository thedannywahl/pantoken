[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# 함수: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Emit the shadcn → Instructure CSS-variable bridge.

## 매개변수

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## 반환값

`string`

The bridging CSS string.

## 예제

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
