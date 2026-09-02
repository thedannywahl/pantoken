# A pantoken CLI

`@pantoken/cli` biztosítja a `pantoken generate <target>`-t, amely a token forrást egy céltárba írja.
Használd, amikor egy platformnak generált kódra van szüksége a futásidejű függőség helyett — natív alkalmazások,
CMS témák és statikus webhelygenerálók esetén.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Célok

| Target      | Output                                                                                        |
| ----------- | --------------------------------------------------------------------------------------------- |
| `swift`     | Swift forrás a `Sources/<name>` alatt, valamint egy `Package.swift` SwiftPM manifest stub.    |
| `android`   | Android XML erőforrás fájlok.                                                                 |
| `compose`   | Egy Jetpack Compose Kotlin fájl.                                                              |
| `flutter`   | Egy Flutter Dart fájl.                                                                        |
| `rust`      | Egy `tokens.rs` az egui számára (alapértelmezett) vagy iced (`--format iced`).                |
| `wordpress` | Egy block-theme `theme.json`.                                                                 |
| `vanilla`   | Egy Vanilla Forums `variables.json`.                                                          |
| `drupal`    | Drupal téma erőforrások.                                                                      |
| `jekyll`    | Jekyll webhelyadatok.                                                                         |
| `hugo`      | Hugo webhelyadatok.                                                                           |
| `swatches`  | Színpaletták — `ase` (alapértelmezett), `gpl`, `sketch` vagy `svg` a `--format` segítségével. |
| `icon-font` | Egy ikon webfont (TTF, WOFF2), annak CSS-e és egy codepoints térkép.                          |
| `pendo`     | Az Instructure-stílusú `global.css` a Pendo útmutatókhoz.                                     |

## Gyakori kapcsolók

- `--out <dir>` — hova írja a kimenetet (alapértelmezett `./pantoken-out`).
- `--theme <name>` — `rebrand` (alapértelmezett), `canvas` vagy `canvasHighContrast`.
- `--icons a,b,c` — az ikonnevek, amelyeket natív erőforrásként kell kimenetként generálni, azoknál a céloknál, amelyek támogatják őket.
- `--class <Name>` — a generált típus- vagy csomagnév azoknál a céloknál, amelyeknek szükségük van rá.
- `--format <fmt>` — a kimeneti formátum, a `swatches` és a `rust` esetén.

## Példák

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Több cél is kitesz egy egyszerű függvényt, így meghívhatod őket a saját buildfolyamatodból a CLI helyett.
Lásd az [API reference](/api/) oldalakat az egyes platformcsomagoknál.
