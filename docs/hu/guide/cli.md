# A pantoken CLI

`@pantoken/cli` biztosítja a `pantoken generate <target>` parancsot, amely a token forráskódját egy cél repóba írja.
Akkor érdemes használni, ha egy platform inkább generált kódot igényel, mint futásidejű függőséget — natív alkalmazások,
CMS-témák és statikus oldalgenerátorok esetén.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Célok

| Cél         | Kimenet                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `swift`     | Swift forráskód a `Sources/<name>` alatt, valamint egy `Package.swift` SwiftPM manifest csonk. |
| `android`   | Android XML erőforrásfájlok.                                                                   |
| `compose`   | Egy Jetpack Compose Kotlin fájl.                                                               |
| `flutter`   | Egy Flutter Dart fájl.                                                                         |
| `rust`      | Egy `tokens.rs` az egui (alapértelmezett) vagy iced (`--format iced`) számára.                 |
| `wordpress` | Egy blokk-témás `theme.json`.                                                                  |
| `vanilla`   | Egy Vanilla Forums `variables.json`.                                                           |
| `drupal`    | Drupal téma-erőforrások.                                                                       |
| `jekyll`    | Jekyll oldal adatai.                                                                           |
| `hugo`      | Hugo oldal adatai.                                                                             |
| `swatches`  | Színminták — `ase` (alapértelmezett), `gpl`, `sketch` vagy `svg` a `--format` segítségével.    |
| `icon-font` | Egy ikon webfont (TTF, WOFF2), annak CSS-e és egy kódpont-térkép.                              |
| `pendo`     | Az Instructure-stílusú `global.css` a Pendo útmutatókhoz.                                      |

## Gyakori kapcsolók

- `--out <dir>` — hová írjon (alapértelmezés: `./pantoken-out`).
- `--theme <name>` — `rebrand` (alapértelmezett), `canvas` vagy `canvasHighContrast`.
- `--icons a,b,c` — az ikonok nevei, amelyeket natív erőforrásként kell kiadni, azokhoz a célokhoz, amelyek támogatják.
- `--class <Name>` — a generált típus- vagy csomagnév azokhoz a célokhoz, amelyeknek szükségük van rá.
- `--format <fmt>` — a kimeneti formátum a `swatches` és a `rust` számára.

## Példák

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Több cél sima függvényt is elérhetővé tesz, így saját buildből is meghívhatod ezeket a CLI helyett.
Lásd az [API-referenciát](/api/) az egyes platformcsomagokhoz.
