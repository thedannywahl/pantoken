[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoSvg

# Function: getLogoSvg()

> **getLogoSvg**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ստանալ լոգոյի հում SVG:

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

SVG տողը կամ `undefined`, եթե այդ համակցումը գոյություն չունի:

## Examples

**Ստանալ լռելյայն հորիզոնական, լիի գույն Canvas լոգո**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const svg = getLogoSvg("canvas");
```

**Ընտրել կոնկրետ դասավորում և գույնի վերաբերմունք**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const reversed = getLogoSvg("instructure", "stacked", "reversed");
```
