[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoDataUri

# Swyddogaeth: getLogoDataUri()

> **getLogoDataUri**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Get a logo as a base64 `data:image/svg+xml` URI.

## Paramedrau

### product

[`Product`](../type-aliases/Product.md)

The product.

### layout?

[`LogoLayout`](../type-aliases/LogoLayout.md) = `"horizontal"`

The layout (default `"horizontal"`).

### colorMode?

[`LogoColorMode`](../type-aliases/LogoColorMode.md) = `"full-color"`

The color treatment (default `"full-color"`).

## Yn dychwelyd

`string` \| `undefined`

The data URI, or `undefined` if that combination doesn't exist.

## Enghraifft

**Use a logo as an \<img\> src**

```ts
import { getLogoDataUri } from "@pantoken/plugin-logos";

const uri = getLogoDataUri("mastery", "icon", "color");
const img = document.createElement("img");
if (uri) img.src = uri;
```
