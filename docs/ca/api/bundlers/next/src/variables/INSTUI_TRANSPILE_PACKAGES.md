[pantoken](../../../../index.md) / [bundlers/next/src](../index.md) / INSTUI\_TRANSPILE\_PACKAGES

# Variable: INSTUI\_TRANSPILE\_PACKAGES

> `const` **INSTUI\_TRANSPILE\_PACKAGES**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Els paquets de la UI d'Instructure que Next ha de transpilar. Amplia via [WithPantokenOptions](../interfaces/WithPantokenOptions.md).

## Example

**Alimenta la llista en un transpilePackages manual**

```ts
import { INSTUI_TRANSPILE_PACKAGES } from "@pantoken/next";

export default {
  transpilePackages: [...INSTUI_TRANSPILE_PACKAGES, "@instructure/ui-modal"],
};
```
