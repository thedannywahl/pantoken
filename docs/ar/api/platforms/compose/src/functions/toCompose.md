[pantoken](../../../../index.md) / [platforms/compose/src](../index.md) / toCompose

# Function: toCompose()

> **toCompose**(`tokens`, `options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إصدار Compose Kotlin لـ IR علامة صريحة. يعيد مسار الملف المكتوب.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateComposeOptions`](../interfaces/GenerateComposeOptions.md)

## Returns

`Promise`\<`string`\>

## Examples

**إصدار IR لموضوع معين**

```ts
import { toCompose } from "@pantoken/compose";
import { byTheme } from "@pantoken/tokens";

const file = await toCompose(byTheme("canvas"), { outDir: "./ui/tokens" });
// writes ./ui/tokens/PanTokens.kt (object PanTokens { … })
```

**الوضع الداكن باستخدام اسم كائن مخصص**

```ts
import { toCompose } from "@pantoken/compose";
import { byTheme } from "@pantoken/tokens";

await toCompose(byTheme("rebrand"), {
  outDir: "./ui/tokens",
  mode: "dark",
  className: "InstUITokens", // writes InstUITokens.kt
});
```
