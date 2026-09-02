[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# फंक्शन: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Emit Android resource XML for a named theme (using the vendored `@pantoken/tokens` IR).

## पैरामीटर

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## वापसी

`Promise`\<`string`[]\>

The paths of the written `colors.xml` and `dimens.xml`.

## उदाहरण

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
