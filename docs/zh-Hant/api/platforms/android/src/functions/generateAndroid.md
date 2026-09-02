[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# 函式: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Emit Android resource XML for a named theme (using the vendored `@pantoken/tokens` IR).

## 參數

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## 回傳

`Promise`\<`string`[]\>

The paths of the written `colors.xml` and `dimens.xml`.

## 範例

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
