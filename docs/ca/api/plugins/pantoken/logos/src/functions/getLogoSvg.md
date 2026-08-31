[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoSvg

# Function: getLogoSvg()

> **getLogoSvg**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Obtén l'SVG brut d'un logotip.

## Parameters

### product

[`Product`](../type-aliases/Product.md)

El producte.

### layout?

[`LogoLayout`](../type-aliases/LogoLayout.md) = `"horizontal"`

El disseny (per defecte `"horizontal"`).

### colorMode?

[`LogoColorMode`](../type-aliases/LogoColorMode.md) = `"full-color"`

El tractament del color (per defecte `"full-color"`).

## Returns

`string` \| `undefined`

La cadena SVG, o `undefined` si aquesta combinació no existeix.

## Examples

**Obtén el logotip Canvas horitzontal per defecte, a tot color**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const svg = getLogoSvg("canvas");
```

**Tria un disseny i tractament de color específic**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const reversed = getLogoSvg("instructure", "stacked", "reversed");
```
