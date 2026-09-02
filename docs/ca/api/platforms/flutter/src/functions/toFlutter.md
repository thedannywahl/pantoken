[pantoken](../../../../index.md) / [platforms/flutter/src](../index.md) / toFlutter

# Funció: toFlutter()

> **toFlutter**(`tokens`, `options`): `Promise`\<`string`\>

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emet Flutter Dart per a un token IR explícit. Retorna la ruta del fitxer escrit.

## Paràmetres

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

### options

[`GenerateFlutterOptions`](../interfaces/GenerateFlutterOptions.md)

## Retorna

`Promise`\<`string`\>

## Exemples

**Emeteri la IR d'un tema específic**

```ts
import { toFlutter } from "@pantoken/flutter";
import { byTheme } from "@pantoken/tokens";

const file = await toFlutter(byTheme("canvas"), { outDir: "./lib/tokens" });
// writes ./lib/tokens/pantokens.dart (class PanTokens { … })
```

**Mode fosc amb actius d'icona SVG i manifest**

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
