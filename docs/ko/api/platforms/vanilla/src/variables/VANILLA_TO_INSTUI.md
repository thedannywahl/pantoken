[pantoken](../../../../index.md) / [platforms/vanilla/src](../index.md) / VANILLA\_TO\_INSTUI

# 변수: VANILLA\_TO\_INSTUI

> `const` **VANILLA\_TO\_INSTUI**: `Readonly`\<`Record`\<`string`, `string`\>\>

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Dotted Foundation variable path → the Instructure token that fills it.

## 예제

**Read a mapping, or widen coverage by spreading into a new map**

```ts
import { VANILLA_TO_INSTUI } from "@pantoken/vanilla";

VANILLA_TO_INSTUI["global.mainColors.primary"]; // "--instui-color-background-brand"
const extended = { ...VANILLA_TO_INSTUI, "global.body.color": "--instui-color-text-base" };
```
