[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / VANILLA\_TO\_INSTUI

# Variable: VANILLA\_TO\_INSTUI

> `const` **VANILLA\_TO\_INSTUI**: `Readonly`\<`Record`\<`string`, `string`>>>>>>>>\>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Prikket Foundation-variabelsti → det Instructure-token, der udfylder det.

## Example

**Læs et mapping, eller udvid dækningen ved at sprede ind i et nyt kort**

```ts
import { VANILLA_TO_INSTUI } from "@pantoken/vanilla";

VANILLA_TO_INSTUI["global.mainColors.primary"]; // "--instui-color-background-brand"
const extended = { ...VANILLA_TO_INSTUI, "global.body.color": "--instui-color-text-base" };
```
