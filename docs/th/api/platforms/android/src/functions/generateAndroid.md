[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# ฟังก์ชัน: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Emit Android resource XML for a named theme (using the vendored `@pantoken/tokens` IR).

## พารามิเตอร์

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## คืนค่า

`Promise`\<`string`[]\>

The paths of the written `colors.xml` and `dimens.xml`.

## ตัวอย่าง

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
