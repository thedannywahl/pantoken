[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Funkcja: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Parametry

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Zwraca

`string`

The bridging CSS string.

## Przykład

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
