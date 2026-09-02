[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Функція: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Параметри

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Повертає

`string`

The bridging CSS string.

## Приклад

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
