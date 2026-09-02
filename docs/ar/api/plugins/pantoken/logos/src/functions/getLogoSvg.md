[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoSvg

# دالة: getLogoSvg()

> **getLogoSvg**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

احصل على SVG الخام للشعار.

## المعلمات

### product

[`Product`](../type-aliases/Product.md)

المنتج.

### layout?

[`LogoLayout`](../type-aliases/LogoLayout.md) = `"horizontal"`

التخطيط (الافتراضي `"horizontal"`).

### colorMode?

[`LogoColorMode`](../type-aliases/LogoColorMode.md) = `"full-color"`

معالجة الألوان (الافتراضي `"full-color"`).

## القيم المرجعة

`string` \| `undefined`

سلسلة SVG، أو `undefined` إذا لم توجد تلك التركيبة.

## أمثلة

**احصل على شعار Canvas الأفقي الافتراضي كامل الألوان**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const svg = getLogoSvg("canvas");
```

**اختر تخطيطًا ومعالجة ألوان محددة**

```ts
import { getLogoSvg } from "@pantoken/plugin-logos";

const reversed = getLogoSvg("instructure", "stacked", "reversed");
```
