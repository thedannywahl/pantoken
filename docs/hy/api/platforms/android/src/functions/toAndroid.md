[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / toAndroid

# Ֆունկցիա: toAndroid()

> **toAndroid**(`tokens`, `options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արտածել Android ռեսուրսային XML՝ հստակ թոքեն IR-ի համար:

## Պարամետրեր

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## Վերադարձվող արժեք

`Promise`\<`string`[]\>

Գրված `colors.xml` և `dimens.xml`-ի ճանապարհները:

## Օրինակներ

**Արտածել կոնկրետ թեմայի IR**

```ts
import { toAndroid } from "@pantoken/android";
import { byTheme } from "@pantoken/tokens";

const [colors, dimens] = await toAndroid(byTheme("canvas"), { outDir: "./app/src/main" });
// writes ./app/src/main/res/values/colors.xml and dimens.xml
```

**Մութ ռեժիմ VectorDrawables պատկերներով**

```ts
import { toAndroid } from "@pantoken/android";
import { byTheme } from "@pantoken/tokens";

await toAndroid(byTheme("rebrand"), {
  outDir: "./app/src/main",
  mode: "dark",
  icons: ["add", "check"], // also emits res/drawable/ic_add.xml, ic_check.xml
});
```
