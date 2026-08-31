[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoDataUri

# Function: getLogoDataUri()

> **getLogoDataUri**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ստանալ լոգո որպես base64 `data:image/svg+xml` URI:

## Parameters

### product

[`Product`](../type-aliases/Product.md)

Ապրանքը:

### layout?

[`LogoLayout`](../type-aliases/LogoLayout.md) = `"horizontal"`

Դասավորումը (լռելյայն `"horizontal"`):

### colorMode?

[`LogoColorMode`](../type-aliases/LogoColorMode.md) = `"full-color"`

Գույնի վերաբերմունքը (լռելյայն `"full-color"`):

## Returns

`string` \| `undefined`

Տվյալ URI կամ `undefined`, եթե այդ համակցումը գոյություն չունի:

## Example

**Օգտագործել լոգո որպես \<img\> src**

```ts
import { getLogoDataUri } from "@pantoken/plugin-logos";

const uri = getLogoDataUri("mastery", "icon", "color");
const img = document.createElement("img");
if (uri) img.src = uri;
```
