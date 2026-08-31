[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / toAndroid

# Function: toAndroid()

> **toAndroid**(`tokens`, `options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إصدار XML موارد Android لـ IR رموز صريح.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## Returns

`Promise`\<`string`[]\>

مسارات `colors.xml` و`dimens.xml` المكتوبة.

## Examples

**إصدار IR لموضوع معين**

```ts
import { toAndroid } from "@pantoken/android";
import { byTheme } from "@pantoken/tokens";

const [colors, dimens] = await toAndroid(byTheme("canvas"), { outDir: "./app/src/main" });
// writes ./app/src/main/res/values/colors.xml and dimens.xml
```

**الوضع الداكن مع VectorDrawables للأيقونات**

```ts
import { toAndroid } from "@pantoken/android";
import { byTheme } from "@pantoken/tokens";

await toAndroid(byTheme("rebrand"), {
  outDir: "./app/src/main",
  mode: "dark",
  icons: ["add", "check"], // also emits res/drawable/ic_add.xml, ic_check.xml
});
```
