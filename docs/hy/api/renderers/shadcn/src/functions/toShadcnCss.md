[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Ֆունկցիա: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արձակել shadcn → Instructure CSS-variable կամուրջ։

## Պարամետրեր

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Վերադարձվող արժեք

`string`

Կամրջային CSS տողը:

## Օրինակ

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
