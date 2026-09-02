[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Funksjon: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Parametrar

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Returnerer

`string`

The bridging CSS string.

## Døme

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
