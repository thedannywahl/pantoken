[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# Funció: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emeteri XML de recursos Android per a un tema nomenat (utilitzant la `@pantoken/tokens` IR fornida).

## Paràmetres

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## Retorna

`Promise`\<`string`[]\>

Els camins dels `colors.xml` i `dimens.xml` escrits.

## Exemple

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
