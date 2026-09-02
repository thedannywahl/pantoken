[pantoken](../../../../index.md) / [renderers/docusaurus/src](../index.md) / toDocusaurusCss

# Function: toDocusaurusCss()

> **toDocusaurusCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit the Infima → Instructure CSS-variable bridge.

## Parameters

### options?

[`ToDocusaurusCssOptions`](../interfaces/ToDocusaurusCssOptions.md) = `{}`

[ToDocusaurusCssOptions](../interfaces/ToDocusaurusCssOptions.md).

## Returns

`string`

The bridging CSS string.

## Example

```ts
import { toDocusaurusCss } from "@pantoken/docusaurus";

const css = toDocusaurusCss();
// ":root { --ifm-color-primary: var(--instui-color-background-brand); … }"
// Write it into src/css/custom.css alongside @pantoken/css.
```
