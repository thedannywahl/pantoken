[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / VANILLA\_TO\_INSTUI

# Variable: VANILLA\_TO\_INSTUI

> `const` **VANILLA\_TO\_INSTUI**: `Readonly`\<`Record`\<`string`, `string`>>>>>>>>\>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

مسار متغير Foundation مع نقاط → رمز Instructure الذي يملأه.

## Example

**اقرأ تعيينًا، أو وسّع التغطية بنشر في خريطة جديدة**

```ts
import { VANILLA_TO_INSTUI } from "@pantoken/vanilla";

VANILLA_TO_INSTUI["global.mainColors.primary"]; // "--instui-color-background-brand"
const extended = { ...VANILLA_TO_INSTUI, "global.body.color": "--instui-color-text-base" };
```
