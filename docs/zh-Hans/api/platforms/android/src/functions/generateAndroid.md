[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# 函数: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Emit Android resource XML for a named theme (using the vendored `@pantoken/tokens` IR).

## 参数

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## 返回值

`Promise`\<`string`[]\>

The paths of the written `colors.xml` and `dimens.xml`.

## 示例

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
