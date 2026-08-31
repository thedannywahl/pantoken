[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / INSTUI\_TRANSPILE\_PACKAGES

# Variable: INSTUI\_TRANSPILE\_PACKAGES

> `const` **INSTUI\_TRANSPILE\_PACKAGES**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Instructure UI փաթեթներ, որոնք Next-ը պետք է կոդավազգային թարգմանի: Ընդլայնել [WithPantokenOptions](../interfaces/WithPantokenOptions.md)-ի միջոցով:

## Example

**Տեղեկատվությունը մտնել manual transpilePackages-ին:**

```ts
import { INSTUI_TRANSPILE_PACKAGES } from "@pantoken/next";

export default {
  transpilePackages: [...INSTUI_TRANSPILE_PACKAGES, "@instructure/ui-modal"],
};
```
