[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# 함수: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Emit Android resource XML for a named theme (using the vendored `@pantoken/tokens` IR).

## 매개변수

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## 반환값

`Promise`\<`string`[]\>

The paths of the written `colors.xml` and `dimens.xml`.

## 예제

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
