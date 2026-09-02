[pantoken](../../../../index.md) / [renderers/shadcn/src](../index.md) / toShadcnCss

# Mahi: toShadcnCss()

> **toShadcnCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Emit the shadcn → Instructure CSS-variable bridge.

## Ngā Tawhā

### options?

[`ToShadcnCssOptions`](../interfaces/ToShadcnCssOptions.md) = `{}`

[ToShadcnCssOptions](../interfaces/ToShadcnCssOptions.md).

## Whakahokia

`string`

The bridging CSS string.

## Tauira

```ts
import { toShadcnCss } from "@pantoken/shadcn";

const css = toShadcnCss();
// ":root { --primary: var(--instui-color-background-brand); … }"
// Emit alongside @pantoken/css, which defines the --instui-* properties.
```
