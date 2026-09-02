[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoDataUri

# Funktion: getLogoDataUri()

> **getLogoDataUri**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Få et logo som en base64 `data:image/svg+xml` URI.

## Parametre

### product

[`Product`](../type-aliases/Product.md)

Produktet.

### layout?

[`LogoLayout`](../type-aliases/LogoLayout.md) = `"horizontal"`

Layoutet (standard `"horizontal"`).

### colorMode?

[`LogoColorMode`](../type-aliases/LogoColorMode.md) = `"full-color"`

Farvebehandlingen (standard `"full-color"`).

## Returnerer

`string` \| `undefined`

Data-URI'en, eller `undefined` hvis den kombination ikke findes.

## Eksempel

**Brug et logo som en \<img\> src**

```ts
import { getLogoDataUri } from "@pantoken/plugin-logos";

const uri = getLogoDataUri("mastery", "icon", "color");
const img = document.createElement("img");
if (uri) img.src = uri;
```
