[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# Funzione: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Emit Android resource XML for a named theme (using the vendored `@pantoken/tokens` IR).

## Parametri

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## Restituisce

`Promise`\<`string`[]\>

The paths of the written `colors.xml` and `dimens.xml`.

## Esempio

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
