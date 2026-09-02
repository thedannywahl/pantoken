[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / INSTUI\_TRANSPILE\_PACKAGES

# Newidyn: INSTUI\_TRANSPILE\_PACKAGES

> `const` **INSTUI\_TRANSPILE\_PACKAGES**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

The Instructure UI packages Next needs to transpile. Extend via [WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## Enghraifft

**Feed the list into a manual transpilePackages**

```ts
import { INSTUI_TRANSPILE_PACKAGES } from "@pantoken/next";

export default {
  transpilePackages: [...INSTUI_TRANSPILE_PACKAGES, "@instructure/ui-modal"],
};
```
