[pantoken](../../../../index.md) / [packages/core/src](../index.md) / decodeIconSvg

# Function: decodeIconSvg()

> **decodeIconSvg**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Descodifica el valor `url('data:…')` d'un token d'icona de tornada a SVG en línia.

## Parameters

### value

`string`

## Returns

`string`

## Example

```ts
import { decodeIconSvg } from "@pantoken/core";

const svg = "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>";
const value = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
decodeIconSvg(value); // → "<svg viewBox='0 0 24 24'><path d='M1 1'/></svg>"
```
