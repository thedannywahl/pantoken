[pantoken](../../../../index.md) / [renderers/docusaurus/src](../index.md) / toDocusaurusCss

# Funció: toDocusaurusCss()

> **toDocusaurusCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emet el pont de variable CSS de Infima → Instructure.

## Paràmetres

### options?

[`ToDocusaurusCssOptions`](../interfaces/ToDocusaurusCssOptions.md) = `{}`

[ToDocusaurusCssOptions](../interfaces/ToDocusaurusCssOptions.md).

## Retorna

`string`

La cadena CSS de connexió.

## Exemple

```ts
import { toDocusaurusCss } from "@pantoken/docusaurus";

const css = toDocusaurusCss();
// ":root { --ifm-color-primary: var(--instui-color-background-brand); … }"
// Write it into src/css/custom.css alongside @pantoken/css.
```
