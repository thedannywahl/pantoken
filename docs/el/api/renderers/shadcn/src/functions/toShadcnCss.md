[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Συνάρτηση: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Παράμετροι

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Επιστρέφει

`string`

The bridging CSS string.

## Παράδειγμα

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
