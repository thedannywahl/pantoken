[pantoken](../../../../index.md) / [packages/core/src](../index.md) / decodeIconSvg

# Ֆունկցիա: decodeIconSvg()

> **decodeIconSvg**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Decode icon token-ի `url('data:…')` արժեքը հետ inline SVG:

## Պարամետրեր

### value

`string`

## Վերադարձվող արժեք

`string`

## Օրինակ

```ts
import { decodeIconSvg } from "@pantoken/core";

const svg = "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>";
const value = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
decodeIconSvg(value); // → "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>"
```
