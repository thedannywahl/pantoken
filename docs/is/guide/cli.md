# Pantoken CLI

`@pantoken/cli` býður upp á `pantoken generate <target>`, sem skrifar token-gögn í markverkefni (repo).
Nota það þegar vettvangur þarf framleitt kóða frekar en keyrslutímaháða — native forrit,
CMS-þemu og statískar vefsíðugerðir.

```sh
npx pantoken generate <target> --out <dir> [--theme <name>] [--icons a,b,c]
```

## Markmið

| Target      | Output                                                                              |
| ----------- | ----------------------------------------------------------------------------------- |
| `swift`     | Swift-súrsaður undir `Sources/<name>` auk `Package.swift` SwiftPM manifest stubs.   |
| `android`   | Android XML-auðlindaskrár.                                                          |
| `compose`   | Jetpack Compose Kotlin-skrá.                                                        |
| `flutter`   | Flutter Dart-skrá.                                                                  |
| `rust`      | `tokens.rs` fyrir t.d. egui (sjálfgefið) eða iced (`--format iced`).                |
| `wordpress` | Block-þema `theme.json`.                                                            |
| `vanilla`   | Vanilla Forums `variables.json`.                                                    |
| `drupal`    | Drupal þema-auðlindir.                                                              |
| `jekyll`    | Jekyll síðugögn.                                                                    |
| `hugo`      | Hugo síðugögn.                                                                      |
| `swatches`  | Litapallettur — `ase` (sjálfgefið), `gpl`, `sketch`, eða `svg` í gegnum `--format`. |
| `icon-font` | Tákn-vefletur (TTF, WOFF2), CSS þess, og kort af codepoints.                        |
| `pendo`     | Instructure-stílaði `global.css` fyrir Pendo leiðbeiningar.                         |

## Algengar valkostir

- `--out <dir>` — hvar á að skrifa (sjálfgefið `./pantoken-out`).
- `--theme <name>` — `rebrand` (sjálfgefið), `canvas`, eða `canvasHighContrast`.
- `--icons a,b,c` — tákngögn sem á að mynda sem native-auðlindir, fyrir markmið sem styðja þau.
- `--class <Name>` — nafnið á mynduðum týpu eða pakka, fyrir markmið sem þurfa það.
- `--format <fmt>` — úttaksformat, fyrir `swatches` og `rust`.

## Dæmi

```sh
# iOS tokens plus two icons, in the Canvas theme.
npx pantoken generate swift --out ./ios/Tokens --theme canvas --icons arrow-left,check-mark

# A WordPress block theme's theme.json.
npx pantoken generate wordpress --out ./wp-content/themes/mytheme

# An egui palette for a Rust app.
npx pantoken generate rust --out ./src/tokens.rs --format egui
```

Fjölmörg markmið bjóða einnig upp á beina fallaframsetningu, þannig að hægt er að kalla þau úr eigin byggingu í stað
fyrir CLI-ið. Sjá [API reference](/api/) fyrir hvert platform-pakka.
