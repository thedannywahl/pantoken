[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / iconSvg

# Funktion: iconSvg()

> **iconSvg**(`name`, `resolve?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Resolve an icon name to inline SVG (empty string when unknown). Pure — the element renders it.

## Parameter

### name

`string`

The icon name (e.g. `arrow-left`).

### resolve?

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

The resolver (defaults to the built-in pantoken icon set).

## Rückgabe

`string`

## Beispiel

```ts
import { iconSvg } from "@pantoken/web-components";

const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
```
