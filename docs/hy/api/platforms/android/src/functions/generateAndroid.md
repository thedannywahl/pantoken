[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / generateAndroid

# Ֆունկցիա: generateAndroid()

> **generateAndroid**(`options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արտածել Android ռեսուրսային XML՝ անվանված թեմայի համար (օգտագործելով վաճառականներ `@pantoken/tokens` IR):

## Պարամետրեր

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## Վերադարձվող արժեք

`Promise`\<`string`[]\>

Գրված `colors.xml` և `dimens.xml`-ի ճանապարհները:

## Օրինակ

```ts
import { generateAndroid } from "@pantoken/android";

const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
// ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
```
