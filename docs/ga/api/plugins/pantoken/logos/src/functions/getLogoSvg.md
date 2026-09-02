[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoSvg

# Feidhm: getLogoSvg()

> **getLogoSvg**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Get a logo's raw SVG.

## Paraiméadair

### product

[`Product`](../type-aliases/Product.md)

The product.

### layout?

[`LogoLayout`](../type-aliases/LogoLayout.md) = `"horizontal"`

The layout (default `"horizontal"`).

### colorMode?

[`LogoColorMode`](../type-aliases/LogoColorMode.md) = `"full-color"`

The color treatment (default `"full-color"`).

## Tuairisceáin

`string` \| `undefined`

The SVG string, or `undefined` if that combination doesn't exist.

## Samplaí

**Get the default horizontal, full-color Canvas logo**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const svg = getLogoSvg("canvas");
```

**Pick a specific layout and color treatment**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const reversed = getLogoSvg("instructure", "stacked", "reversed");
```
