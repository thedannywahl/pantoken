[pantoken](../../../../index.md) / [renderers/docusaurus/src](../index.md) / toDocusaurusCss

# Συνάρτηση: toDocusaurusCss()

> **toDocusaurusCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Emit the Infima → Instructure CSS-variable bridge.

## Παράμετροι

### options?

[`ToDocusaurusCssOptions`](../interfaces/ToDocusaurusCssOptions.md) = `{}`

[ToDocusaurusCssOptions](../interfaces/ToDocusaurusCssOptions.md).

## Επιστρέφει

`string`

The bridging CSS string.

## Παράδειγμα

```ts
import { toDocusaurusCss } from "@pantoken/docusaurus";

const css = toDocusaurusCss();
// ":root { --ifm-color-primary: var(--instui-color-background-brand); … }"
// Write it into src/css/custom.css alongside @pantoken/css.
```
