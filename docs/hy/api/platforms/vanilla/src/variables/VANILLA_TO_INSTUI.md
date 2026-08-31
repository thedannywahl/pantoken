[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / VANILLA\_TO\_INSTUI

# Variable: VANILLA\_TO\_INSTUI

> `const` **VANILLA\_TO\_INSTUI**: `Readonly`\<`Record`\<`string`, `string`>>>>>>>>\>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Կետերով բաժանված Foundation փոփոխականի ճանապարհ → Instructure տոկենը, որը այն լրացնում է:

## Example

**Կարդացեք քարտեզագրում, կամ ընդլայնեք ծածկույթը նոր քարտեզի մեջ տարածելով**

```ts
import { VANILLA_TO_INSTUI } from "@pantoken/vanilla";

VANILLA_TO_INSTUI["global.mainColors.primary"]; // "--instui-color-background-brand"
const extended = { ...VANILLA_TO_INSTUI, "global.body.color": "--instui-color-text-base" };
```
