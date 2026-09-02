[pantoken](../../../../index.md) / [renderers/docusaurus/src](../index.md) / toDocusaurusCss

# Funktion: toDocusaurusCss()

> **toDocusaurusCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Emit the Infima → Instructure CSS-variable bridge.

## Parameter

### options?

[`ToDocusaurusCssOptions`](../interfaces/ToDocusaurusCssOptions.md) = `{}`

[ToDocusaurusCssOptions](../interfaces/ToDocusaurusCssOptions.md).

## Rückgabe

`string`

The bridging CSS string.

## Beispiel

```ts
import { toDocusaurusCss } from "@pantoken/docusaurus";

const css = toDocusaurusCss();
// ":root { --ifm-color-primary: var(--instui-color-background-brand); … }"
// Write it into src/css/custom.css alongside @pantoken/css.
```
