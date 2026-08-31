[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# Function: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Udsend Android-ressource XML til et navngivet tema (ved hjælp af den inkluderede `@pantoken/tokens` IR).

## Parameters

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## Returns

`Promise`\<`string`[]\>

Stierne af de skrevne `colors.xml` og `dimens.xml`.

## Example

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
