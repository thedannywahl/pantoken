# Pantoken CLI

`@pantoken/cli` leat `pantoken generate <target>`, mii girjjá token-birget doaibmá target-repo:s. Geavahusa dađe go platforma galggá genererda koda nammas leat runtime-dependensii maid — nativ applikáččat, CMS-theammat ja statiikka-sajtta genererahttoheapmi.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Máŋgaheapmi

| Máŋga       | Oaidnaleapmi                                                                      |
| ----------- | --------------------------------------------------------------------------------- |
| `swift`     | Swift-birget `Sources/<name>` almmuhus ja `Package.swift` SwiftPM manifest-stub.  |
| `android`   | Android XML-resurssafáilat.                                                       |
| `compose`   | Jetpack Compose Kotlin-fáilu.                                                     |
| `flutter`   | Flutter Dart-fáilu.                                                               |
| `rust`      | `tokens.rs` mt. egui (default) dahje iced (`--format iced`).                      |
| `wordpress` | Block-theme `theme.json`.                                                         |
| `vanilla`   | Vanilla Forums `variables.json`.                                                  |
| `drupal`    | Drupal-theme-assetta.                                                             |
| `jekyll`    | Jekyll-sajtta dáhtton.                                                            |
| `hugo`      | Hugo-sajtta dáhtton.                                                              |
| `swatches`  | Fáhččat — `ase` (default), `gpl`, `sketch`, dahje `svg` geavaheami `--format`.-a. |
| `icon-font` | Ikon-web-fonta (TTF, WOFF2), sen CSS ja codepoints-mappu.                         |
| `pendo`     | Instructure-stylerus `global.css` Pendo-guidede álggus.                           |

## Oammuid flaggat

- `--out <dir>` — gos oaidnet (default `./pantoken-out`).
- `--theme <name>` — `rebrand` (default), `canvas`, dahje `canvasHighContrast`.
- `--icons a,b,c` — ikon-animmeannet mat galggašeavat emitteháldat nativ-assettaide, máŋgaheapmmas mii geavahuvvot sis.
- `--class <Name>` — genererdiinna type dahje package-nuora, máŋgaheapmmas mii galggašii dahkat.
- `--format <fmt>` — oaidnaleapmi-format, `swatches` ja `rust` ovdamearkkašii.

## Dárbmemusat

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Muhtin máŋgaheapmmas čuohppat maid geavahuvvojit buoruid funktiona, nu ahte sáhttát geavahit siid dohkkehuvvon build:st dahje CLI-su. Leat čájehahttit [API reference](/api/) juhkŋa platforma-package-a.
