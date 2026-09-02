[pantoken](../../../../index.md) / [packages/core/src](../index.md) / flutterIconManifest

# Funció: flutterIconManifest()

> **flutterIconManifest**(`names`, `assetDir?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix un manifest Flutter/Dart de rutes d'actius d'icones (per a `flutter_svg`). Emparellar amb els SVGs crus
copiats sota `assetDir`.

## Paràmetres

### names

readonly `string`[]

Noms d'icona.

### assetDir?

`string` = `"assets/pantoken/icons"`

El directori d'actius on es copien els SVGs (per defecte `assets/pantoken/icons`).

## Retorna

`string`

Font Dart que declara una classe `PanTokensIcons` de constants de ruta d'actius.

## Exemples

**Directori d'actius per defecte**

```ts
import { flutterIconManifest } from "@pantoken/core";

flutterIconManifest(["arrow-left", "check-mark"]);
// → class PanTokensIcons {
//     static const String arrowLeft = 'assets/pantoken/icons/arrow-left.svg';
//     static const String checkMark = 'assets/pantoken/icons/check-mark.svg';
//   }
```

**Un directori d'actius personalitzat**

```ts
import { flutterIconManifest } from "@pantoken/core";

flutterIconManifest(["arrow-left"], "lib/icons");
// → static const String arrowLeft = 'lib/icons/arrow-left.svg';
```
