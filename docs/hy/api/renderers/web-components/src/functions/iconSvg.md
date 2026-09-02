[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / iconSvg

# Ֆունկցիա: iconSvg()

> **iconSvg**(`name`, `resolve?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Լուծել պատկերակի անունը ընդերքային SVG-ին (դատարկ տող, երբ անծանոթ): Մաքուր — տարրը այն շարադրում է:

## Պարամետրեր

### name

`string`

Պատկերակի անունը (օր.՝ `arrow-left`):

### resolve?

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md) = `pantokenResolve`

Լուծողը (լռակյա՝ ներկառուցված pantoken պատկերակների հավաքածու):

## Վերադարձվող արժեք

`string`

## Օրինակ

```ts
import { iconSvg } from "@pantoken/web-components";

const svg = iconSvg("arrow-left"); // "<svg …>…</svg>", or "" when unknown
```
