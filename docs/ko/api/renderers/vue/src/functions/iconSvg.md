[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / iconSvg

# 함수: iconSvg()

> **iconSvg**(`name`, `resolve?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Resolve an icon name to inline SVG (empty string when unknown). Pure — the element renders it.

## 매개변수

### name

`string`

The icon name (e.g. `arrow-left`).

### resolve?

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

The resolver (defaults to the built-in pantoken icon set).

## 반환값

`string`

## 예제

```ts
import { iconSvg } from "@pantoken/web-components";

const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
```
