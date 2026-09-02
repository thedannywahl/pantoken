[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / iconSvg

# Функція: iconSvg()

> **iconSvg**(`name`, `resolve?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

Resolve an icon name to inline SVG (empty string when unknown). Pure — the element renders it.

## Параметри

### name

`string`

The icon name (e.g. `arrow-left`).

### resolve?

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md) = `pantokenResolve`

The resolver (defaults to the built-in pantoken icon set).

## Повертає

`string`

## Приклад

```ts
import { iconSvg } from "@pantoken/web-components";

const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
```
