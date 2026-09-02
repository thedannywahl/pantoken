[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# Funktion: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udsend Android-ressource XML til et navngivet tema (ved hjælp af den inkluderede `@pantoken/tokens` IR).

## Parametre

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## Returnerer

`Promise`\<`string`[]\>

Stierne af de skrevne `colors.xml` og `dimens.xml`.

## Eksempel

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
