[pantoken](../../../../index.md) / [platforms/android/src](../index.md) / toAndroid

# फंक्शन: toAndroid()

> **toAndroid**(`tokens`, `options`): `Promise`\<`string`[]\>

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Emit Android resource XML for an explicit token IR.

## पैरामीटर

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateAndroidOptions`](../interfaces/GenerateAndroidOptions.md)

## वापसी

`Promise`\<`string`[]\>

The paths of the written `colors.xml` and `dimens.xml`.

## उदाहरण

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
