[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoSvg

# Function: getLogoSvg()

> **getLogoSvg**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Få et logos rå SVG.

## Parameters

### product

[`Product`](../type-aliases/Product.md)

Produktet.

### layout?

[`LogoLayout`](../type-aliases/LogoLayout.md) = `"horizontal"`

Layoutet (standard `"horizontal"`).

### colorMode?

[`LogoColorMode`](../type-aliases/LogoColorMode.md) = `"full-color"`

Farvebehandlingen (standard `"full-color"`).

## Returns

`string` \| `undefined`

SVG-strengen, eller `undefined` hvis den kombination ikke findes.

## Examples

**Få Canvas-standardlogoen i horisontalt, fuldt farvebillede**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const svg = getLogoSvg("canvas");
```

**Vælg et specifikt layout og farvepåtegning**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const reversed = getLogoSvg("instructure", "stacked", "reversed");
```
