[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / iconSvg

# Function: iconSvg()

> **iconSvg**(`name`, `resolve?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Løs et ikonnavn til inline SVG (tom streng når ukendt). Ren — elementet gengiver det.

## Parameters

### name

`string`

Ikonnavnet (f.eks. `arrow-left`).

### resolve?

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md) = `pantokenResolve`

Resolveren (standard til det indbyggede pantoken-ikonsæt).

## Returns

`string`

## Example

```ts
import { iconSvg } from "@pantoken/web-components";

const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
```
