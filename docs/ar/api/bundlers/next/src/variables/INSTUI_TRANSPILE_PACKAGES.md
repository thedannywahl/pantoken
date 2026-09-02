[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / INSTUI\_TRANSPILE\_PACKAGES

# متغير: INSTUI\_TRANSPILE\_PACKAGES

> `const` **INSTUI\_TRANSPILE\_PACKAGES**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

حزم Instructure UI التي يحتاجها Next لتجري عليها عملية transpile. قم بالتمديد عبر [WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## مثال

**أدخِل القائمة في transpilePackages اليدوي**

```ts
import { INSTUI_TRANSPILE_PACKAGES } from "@pantoken/next";

export default {
  transpilePackages: [...INSTUI_TRANSPILE_PACKAGES, "@instructure/ui-modal"],
};
```
