[pantoken](../../../../index.md) / [packages/core/src](../index.md) / decodeIconSvg

# Funktion: decodeIconSvg()

> **decodeIconSvg**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Decode an icon token's `url('data:…')` value back to inline SVG.

## Parametrar

### value

`string`

## Returnerar

`string`

## Exempel

```ts
import { decodeIconSvg } from "@pantoken/core";

const svg = "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>";
const value = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
decodeIconSvg(value); // → "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>"
```
