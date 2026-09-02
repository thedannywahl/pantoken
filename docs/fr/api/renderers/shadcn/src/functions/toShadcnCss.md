[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Fonction: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Paramètres

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Renvoie

`string`

The bridging CSS string.

## Exemple

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
