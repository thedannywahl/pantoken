[pantoken](../../../../../index.md) / [plugins/pantoken/logos/src](../index.md) / getLogoDataUri

# Function: getLogoDataUri()

> **getLogoDataUri**(`product`, `layout?`, `colorMode?`): `string` \| `undefined`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

احصل على شعار كـ URI `data:image/svg+xml` base64.

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

URI البيانات، أو `undefined` إذا كان هذا المزيج غير موجود.

## Example

**استخدم شعارًا كـ src \<img\>**

```ts
import { getLogoDataUri } from "@pantoken/plugin-logos";

const uri = getLogoDataUri("mastery", "icon", "color");
const img = document.createElement("img");
if (uri) img.src = uri;
```
