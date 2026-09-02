[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / toAndroid

# Funzione: toAndroid()

> **toAndroid**(`tokens`, `options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Emit Android resource XML for an explicit token IR.

## Parametri

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## Restituisce

`Promise`\<`string`[]\>

The paths of the written `colors.xml` and `dimens.xml`.

## Esempi

**Emit a specific theme's IR**

```ts
import { toAndroid } from "@pantoken/android";
import { byTheme } from "@pantoken/tokens";

const [colors, dimens] = await toAndroid(byTheme("canvas"), { outDir: "./app/src/main" });
// writes ./app/src/main/res/values/colors.xml and dimens.xml
```

**Dark mode with icon VectorDrawables**

```ts
import { toAndroid } from "@pantoken/android";
import { byTheme } from "@pantoken/tokens";

await toAndroid(byTheme("rebrand"), {
  outDir: "./app/src/main",
  mode: "dark",
  icons: ["add", "check"], // also emits res/drawable/ic_add.xml, ic_check.xml
});
```
