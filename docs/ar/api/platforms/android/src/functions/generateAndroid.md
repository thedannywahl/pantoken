[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# Function: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إصدار XML موارد Android لموضوع مسمى (باستخدام IR `@pantoken/tokens` الموزع).

## Parameters

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## Returns

`Promise`\<`string`[]\>

مسارات `colors.xml` و`dimens.xml` المكتوبة.

## Example

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
