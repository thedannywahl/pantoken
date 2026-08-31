[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoSvg

# Function: getLogoSvg()

> **getLogoSvg**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

احصل على SVG خام للشعار.

## Parameters

### product

[`Product`](../type-aliases/Product.md)

المنتج.

### layout?

[`LogoLayout`](../type-aliases/LogoLayout.md) = `"horizontal"`

التخطيط (الافتراضي `"horizontal"`).

### colorMode?

[`LogoColorMode`](../type-aliases/LogoColorMode.md) = `"full-color"`

معالجة اللون (الافتراضي `"full-color"`).

## Returns

`string` \| `undefined`

سلسلة SVG، أو `undefined` إذا كان هذا المزيج غير موجود.

## Examples

**احصل على شعار Canvas الأفقي الافتراضي بألوان كاملة**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const svg = getLogoSvg("canvas");
```

**اختر تخطيطًا معينًا ومعالجة لونية**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const reversed = getLogoSvg("instructure", "stacked", "reversed");
```
