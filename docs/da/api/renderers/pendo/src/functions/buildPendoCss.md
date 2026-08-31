[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# Function: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opbyg Pendo-vejledningens stylesheet.

## Parameters

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## Returns

`string`

Den komponerede CSS.

## Examples

**Standardopbygning for rebranding (omfang, !important, beskåret)**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss();
```

**Canvas-tema, uden omfang, behold det fulde token-sæt**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss({ theme: "canvas", scope: false, prune: false });
```
