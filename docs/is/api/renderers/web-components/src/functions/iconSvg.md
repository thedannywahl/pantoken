[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / iconSvg

# Fall: iconSvg()

> **iconSvg**(`name`, `resolve?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Resolve an icon name to inline SVG (empty string when unknown). Pure — the element renders it.

## Færibreytur

### name

`string`

The icon name (e.g. `arrow-left`).

### resolve?

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md) = `pantokenResolve`

The resolver (defaults to the built-in pantoken icon set).

## Skilar

`string`

## Dæmi

```ts
import { iconSvg } from "@pantoken/web-components";

const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
```
