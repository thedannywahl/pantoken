[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoDataUri

# دالة: getLogoDataUri()

> **getLogoDataUri**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

الحصول على شعار كـ URI `data:image/svg+xml` مُرمّز بصيغة base64.

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

URI البيانات، أو `undefined` إذا لم تكن تلك التركيبة موجودة.

## مثال

**استخدم شعارًا كمصدر \<img\> src**

```ts
import { getLogoDataUri } from "@pantoken/plugin-logos";

const uri = getLogoDataUri("mastery", "icon", "color");
const img = document.createElement("img");
if (uri) img.src = uri;
```
