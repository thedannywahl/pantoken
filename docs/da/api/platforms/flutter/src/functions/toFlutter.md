[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / toFlutter

# Funktion: toFlutter()

> **toFlutter**(`tokens`, `options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Udsend Flutter Dart til en eksplicit token IR. Returnerer den skrevne filsti.

## Parametre

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Returnerer

`Promise`\<`string`\>

## Eksempler

**Udsend et specifikt temas IR**

```ts
import { toFlutter } from "@pantoken/flutter";
import { byTheme } from "@pantoken/tokens";

const file = await toFlutter(byTheme("canvas"), { outDir: "./lib/tokens" });
// writes ./lib/tokens/pantokens.dart (class PanTokens { … })
```

**Mørk tilstand med SVG-ikonaktiver og manifest**

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
