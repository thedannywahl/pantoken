[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# تابع: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Emit Android resource XML for a named theme (using the vendored `@pantoken/tokens` IR).

## پارامترها

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## مقدار بازگشتی

`Promise`\<`string`[]\>

The paths of the written `colors.xml` and `dimens.xml`.

## نمونه

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
