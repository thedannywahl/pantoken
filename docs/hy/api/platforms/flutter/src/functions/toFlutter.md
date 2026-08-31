[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / toFlutter

# Function: toFlutter()

> **toFlutter**(`tokens`, `options`): `Promise`\<`string`>>>>\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Արտանետել Flutter Dart հստակ token IR-ի համար։ Վերադարձնում է գրված ֆայլի ճանապարհը։

## Parameters

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Returns

`Promise`\<`string`\>

## Examples

**Արտածել կոնկրետ թեմայի IR**

```ts
import { toFlutter } from "@pantoken/flutter";
import { byTheme } from "@pantoken/tokens";

const file = await toFlutter(byTheme("canvas"), { outDir: "./lib/tokens" });
// writes ./lib/tokens/pantokens.dart (class PanTokens { … })
```

**Մութ ռեժիմ SVG պատկերակի ակտիվներով և մանիֆեստով**

```ts
import { toFlutter } from "@pantoken/flutter";
import { byTheme } from "@pantoken/tokens";

await toFlutter(byTheme("rebrand"), {
  outDir: "./lib/tokens",
  mode: "dark",
  className: "InstUITokens",
  icons: ["add", "check"], // copies SVGs + writes pantoken_icons.dart
});
```
