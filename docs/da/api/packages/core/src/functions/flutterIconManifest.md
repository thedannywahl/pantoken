[pantoken](../../../../index.md) / [packages/core/src](../index.md) / flutterIconManifest

# Funktion: flutterIconManifest()

> **flutterIconManifest**(`names`, `assetDir?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg et Flutter/Dart-manifest over ikon-aktivstier (for `flutter_svg`). Par med de rå SVG'er
kopieret under `assetDir`.

## Parametre

### names

readonly `string`[]

Ikonnavn.

### assetDir?

`string` = `"assets/pantoken/icons"`

Aktivmappet hvor SVG'erne kopieres til (standard `assets/pantoken/icons`).

## Returnerer

`string`

Dart-kilde der erklærer en `PanTokensIcons` klasse af aktivsti-konstanter.

## Eksempler

**Standardaktivmappe**

```ts
import { flutterIconManifest } from "@pantoken/core";

flutterIconManifest(["arrow-left", "check-mark"]);
// → class PanTokensIcons {
//     static const String arrowLeft = 'assets/pantoken/icons/arrow-left.svg';
//     static const String checkMark = 'assets/pantoken/icons/check-mark.svg';
//   }
```

**En brugerdefineret aktivmappe**

```ts
import { flutterIconManifest } from "@pantoken/core";

flutterIconManifest(["arrow-left"], "lib/icons");
// → static const String arrowLeft = 'lib/icons/arrow-left.svg';
```
