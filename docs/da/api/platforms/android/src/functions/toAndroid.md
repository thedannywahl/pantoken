[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / toAndroid

# Function: toAndroid()

> **toAndroid**(`tokens`, `options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Udsend Android-ressource XML til en eksplicit token IR.

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## Returns

`Promise`\<`string`[]\>

Stierne af de skrevne `colors.xml` og `dimens.xml`.

## Examples

**Udsend et specifikt temas IR**

```ts
import { toAndroid } from "@pantoken/android";
import { byTheme } from "@pantoken/tokens";

const [colors, dimens] = await toAndroid(byTheme("canvas"), { outDir: "./app/src/main" });
// writes ./app/src/main/res/values/colors.xml and dimens.xml
```

**Mørk tilstand med icon VectorDrawables**

```ts
import { toAndroid } from "@pantoken/android";
import { byTheme } from "@pantoken/tokens";

await toAndroid(byTheme("rebrand"), {
  outDir: "./app/src/main",
  mode: "dark",
  icons: ["add", "check"], // also emits res/drawable/ic_add.xml, ic_check.xml
});
```
