[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoDataUri

# Funció: getLogoDataUri()

> **getLogoDataUri**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Obtén un logotip com a URI `data:image/svg+xml` base64.

## Paràmetres

### product

[`Product`](../type-aliases/Product.md)

El producte.

### layout?

[`LogoLayout`](../type-aliases/LogoLayout.md) = `"horizontal"`

El disseny (per defecte `"horizontal"`).

### colorMode?

[`LogoColorMode`](../type-aliases/LogoColorMode.md) = `"full-color"`

El tractament del color (per defecte `"full-color"`).

## Retorna

`string` \| `undefined`

L'URI de dades, o `undefined` si aquesta combinació no existeix.

## Exemple

**Utilitza un logotip com a src \<img\>**

```ts
import { getLogoDataUri } from "@pantoken/plugin-logos";

const uri = getLogoDataUri("mastery", "icon", "color");
const img = document.createElement("img");
if (uri) img.src = uri;
```
