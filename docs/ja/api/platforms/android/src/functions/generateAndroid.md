[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# 関数: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Emit Android resource XML for a named theme (using the vendored `@pantoken/tokens` IR).

## パラメーター

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## 戻り値

`Promise`\<`string`[]\>

The paths of the written `colors.xml` and `dimens.xml`.

## 例

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
