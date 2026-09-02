[pantoken](../../../../index.md) / [packages/core/src](../index.md) / flutterIconManifest

# Функція: flutterIconManifest()

> **flutterIconManifest**(`names`, `assetDir?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Build a Flutter/Dart manifest of icon asset paths (for `flutter_svg`). Pair with the raw SVGs
copied under `assetDir`.

## Параметри

### names

readonly `string`[]

Icon names.

### assetDir?

`string` = `"assets/pantoken/icons"`

The asset directory the SVGs are copied to (default `assets/pantoken/icons`).

## Повертає

`string`

Dart source declaring a `PanTokensIcons` class of asset-path constants.

## Приклади

**Default asset directory**

```ts
import { flutterIconManifest } from "@pantoken/core";

flutterIconManifest(["arrow-left", "check-mark"]);
// → class PanTokensIcons {
//     static const String arrowLeft = 'assets/pantoken/icons/arrow-left.svg';
//     static const String checkMark = 'assets/pantoken/icons/check-mark.svg';
//   }
```

**A custom asset directory**

```ts
import { flutterIconManifest } from "@pantoken/core";

flutterIconManifest(["arrow-left"], "lib/icons");
// → static const String arrowLeft = 'lib/icons/arrow-left.svg';
```
